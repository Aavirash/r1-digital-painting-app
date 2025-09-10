// R1 Digital Painting App
// A comprehensive painting app with kaleidoscope brush, symmetry tools, and more

// Check if running as R1 plugin
if (typeof PluginMessageHandler !== 'undefined') {
  console.log('Running as R1 Creation - Digital Painting App');
} else {
  console.log('Running in browser mode - Digital Painting App');
}

// ===========================================
// Global Variables
// ===========================================

let canvas, ctx;
let isDrawing = false;
let currentTool = 'kaleidoscope';
let currentColor = '#FE5F00';
let brushSize = 5;
let toolbarVisible = false;
let toolbarRotation = 0;
let selectedToolIndex = 0;
let particles = [];
let accelerometerData = { x: 0, y: 0, z: 0 };
let pressure = 1.0;
let undoStack = [];
let symmetryEnabled = false;
let symmetryLines = 4;

const tools = [
  { name: 'kaleidoscope', icon: '<i class="fas fa-magic"></i>', label: 'Kaleidoscope' },
  { name: 'symmetry', icon: '<i class="fas fa-sync-alt"></i>', label: 'Symmetry' },
  { name: 'watercolor', icon: '<i class="fas fa-paint-brush"></i>', label: 'Watercolor' },
  { name: 'eraser', icon: '<i class="fas fa-eraser"></i>', label: 'Eraser' },
  { name: 'text', icon: '<i class="fas fa-font"></i>', label: 'Text' },
  { name: 'llm', icon: '<i class="fas fa-microphone"></i>', label: 'AI Advice' },
  { name: 'palette', icon: '<i class="fas fa-palette"></i>', label: 'Palette' }
];

// ===========================================
// Canvas Setup and Drawing Functions
// ===========================================

function initCanvas() {
  canvas = document.getElementById('paintCanvas');
  ctx = canvas.getContext('2d');
  
  // Set canvas size for R1 device (240x282px)
  canvas.width = 240;
  canvas.height = 230; // Leave space for toolbar
  
  // Set up canvas styling
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Save initial state for undo
  saveState();
}

function saveState() {
  undoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
  if (undoStack.length > 20) {
    undoStack.shift();
  }
}

function undo() {
  if (undoStack.length > 1) {
    undoStack.pop(); // Remove current state
    const previousState = undoStack[undoStack.length - 1];
    ctx.putImageData(previousState, 0, 0);
    
    // Visual feedback for undo
    showUndoFeedback();
  }
}

function showUndoFeedback() {
  const feedback = document.createElement('div');
  feedback.textContent = 'Undo';
  feedback.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(254, 95, 0, 0.9);
    color: #000;
    padding: 2vw 4vw;
    border-radius: 2vw;
    font-size: 4vw;
    font-weight: bold;
    z-index: 100;
    pointer-events: none;
  `;
  
  document.body.appendChild(feedback);
  
  setTimeout(() => {
    feedback.remove();
  }, 1000);
}

function clearCanvas() {
  // Animated clear with confirmation
  if (confirm('Clear entire canvas? This cannot be undone.')) {
    // Spiral clear animation
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxRadius = Math.sqrt(centerX ** 2 + centerY ** 2);
    let currentRadius = 0;
    
    const clearStep = () => {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(centerX, centerY, currentRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = 'source-over';
      
      currentRadius += 15;
      if (currentRadius < maxRadius + 20) {
        requestAnimationFrame(clearStep);
      } else {
        // Final clear
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        saveState();
        
        // Reset drawing state
        if (drawSymmetry.prevPositions) drawSymmetry.prevPositions = [];
        erase.prevX = null;
        erase.prevY = null;
      }
    };
    
    clearStep();
  }
}

function resetCanvas() {
  // Quick reset without animation - for reset button
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  saveState();
  
  // Reset all drawing states
  if (drawSymmetry.prevPositions) drawSymmetry.prevPositions = [];
  erase.prevX = null;
  erase.prevY = null;
  particles.length = 0;
  
  // Show reset feedback
  const feedback = document.createElement('div');
  feedback.textContent = 'Reset';
  feedback.style.cssText = `
    position: fixed;
    top: 20%;
    right: 4vw;
    background: rgba(255, 255, 255, 0.9);
    color: #000;
    padding: 2vw 3vw;
    border-radius: 2vw;
    font-size: 3vw;
    font-weight: bold;
    z-index: 100;
    pointer-events: none;
  `;
  
  document.body.appendChild(feedback);
  
  setTimeout(() => {
    feedback.remove();
  }, 1500);
}

// ===========================================
// Drawing Tools Implementation
// ===========================================

function drawKaleidoscope(x, y) {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const segments = 12; // More segments for richer patterns
  
  // Calculate distance from center for dynamic effects
  const distanceFromCenter = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
  const maxDistance = Math.sqrt(centerX ** 2 + centerY ** 2);
  const normalizedDistance = distanceFromCenter / maxDistance;
  
  ctx.fillStyle = currentColor;
  ctx.strokeStyle = currentColor;
  ctx.lineWidth = brushSize * pressure * 0.5;
  
  // Create multiple layers for depth
  for (let layer = 0; layer < 3; layer++) {
    const layerAlpha = (0.8 - layer * 0.2) * (1 - normalizedDistance * 0.3);
    ctx.globalAlpha = layerAlpha;
    
    const layerOffset = layer * 2;
    const layerSize = brushSize * pressure * (1 + layer * 0.3);
    
    for (let i = 0; i < segments; i++) {
      const angle = (i * Math.PI * 2) / segments;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      
      // Primary reflection
      const rotatedX = centerX + (x - centerX) * cos - (y - centerY) * sin;
      const rotatedY = centerY + (x - centerX) * sin + (y - centerY) * cos;
      
      // Mirror reflection for true kaleidoscope effect
      const mirrorX = centerX + (centerX - rotatedX);
      const mirrorY = centerY + (centerY - rotatedY);
      
      // Draw primary point
      ctx.beginPath();
      ctx.arc(rotatedX + layerOffset, rotatedY + layerOffset, layerSize, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw mirror point
      ctx.beginPath();
      ctx.arc(mirrorX - layerOffset, mirrorY - layerOffset, layerSize * 0.8, 0, Math.PI * 2);
      ctx.fill();
      
      // Add connecting lines for web effect
      if (layer === 0 && i % 2 === 0) {
        ctx.beginPath();
        ctx.moveTo(rotatedX, rotatedY);
        ctx.lineTo(mirrorX, mirrorY);
        ctx.stroke();
      }
      
      // Add radial burst effect
      if (normalizedDistance > 0.3) {
        const burstLength = 10 * pressure;
        const burstX = rotatedX + cos * burstLength;
        const burstY = rotatedY + sin * burstLength;
        
        ctx.beginPath();
        ctx.moveTo(rotatedX, rotatedY);
        ctx.lineTo(burstX, burstY);
        ctx.stroke();
      }
    }
  }
  
  // Add sparkle effect at center
  if (distanceFromCenter < 20) {
    ctx.globalAlpha = 0.9;
    ctx.fillStyle = '#FFFFFF';
    for (let i = 0; i < 4; i++) {
      const sparkleAngle = (i * Math.PI) / 2 + Date.now() * 0.01;
      const sparkleX = centerX + Math.cos(sparkleAngle) * 5;
      const sparkleY = centerY + Math.sin(sparkleAngle) * 5;
      
      ctx.beginPath();
      ctx.arc(sparkleX, sparkleY, 1, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  ctx.globalAlpha = 1.0;
}

function drawSymmetry(x, y) {
  ctx.fillStyle = currentColor;
  ctx.strokeStyle = currentColor;
  ctx.lineWidth = brushSize * pressure * 0.8;
  
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  
  // Store previous position for brush strokes
  if (!drawSymmetry.prevPositions) {
    drawSymmetry.prevPositions = [];
  }
  
  // Calculate symmetry points
  const symmetryPoints = [];
  for (let i = 0; i < symmetryLines; i++) {
    const angle = (i * Math.PI * 2) / symmetryLines;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    
    const symX = centerX + (x - centerX) * cos - (y - centerY) * sin;
    const symY = centerY + (x - centerX) * sin + (y - centerY) * cos;
    
    symmetryPoints.push({ x: symX, y: symY });
  }
  
  // Draw brush strokes between previous and current positions
  if (drawSymmetry.prevPositions.length === symmetryPoints.length && isDrawing) {
    symmetryPoints.forEach((point, i) => {
      const prevPoint = drawSymmetry.prevPositions[i];
      
      // Draw brush stroke
      ctx.beginPath();
      ctx.moveTo(prevPoint.x, prevPoint.y);
      ctx.lineTo(point.x, point.y);
      ctx.stroke();
      
      // Draw point at current position
      ctx.beginPath();
      ctx.arc(point.x, point.y, brushSize * pressure * 0.5, 0, Math.PI * 2);
      ctx.fill();
    });
  }
  
  // Store current positions for next draw call
  drawSymmetry.prevPositions = symmetryPoints;
  
  // Add particles for visual effect
  if (Math.random() < 0.3) {
    createPaintParticles(x, y, 2);
  }
}

function drawWatercolor(x, y) {
  ctx.fillStyle = currentColor;
  ctx.strokeStyle = currentColor;
  
  // Watercolor effect with variable opacity and size
  const watercolorSize = brushSize * pressure * 2;
  const opacity = 0.1 + Math.random() * 0.2;
  
  ctx.globalAlpha = opacity;
  
  // Create irregular watercolor shape
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI * 2) / 8;
    const radius = watercolorSize * (0.7 + Math.random() * 0.6);
    const px = x + Math.cos(angle) * radius;
    const py = y + Math.sin(angle) * radius;
    
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();
  
  // Add watercolor bleeding effect
  if (Math.random() < 0.4) {
    ctx.globalAlpha = opacity * 0.5;
    ctx.beginPath();
    ctx.arc(x + (Math.random() - 0.5) * watercolorSize, 
            y + (Math.random() - 0.5) * watercolorSize, 
            watercolorSize * 0.8, 0, Math.PI * 2);
    ctx.fill();
  }
  
  ctx.globalAlpha = 1.0;
  
  // Add particles for texture
  if (Math.random() < 0.5) {
    createPaintParticles(x, y, 1);
  }
}

function erase(x, y) {
  ctx.globalCompositeOperation = 'destination-out';
  ctx.strokeStyle = 'rgba(0,0,0,1)';
  ctx.lineWidth = brushSize * pressure * 1.5;
  
  // If we have a previous position, draw a line
  if (erase.prevX !== null && erase.prevY !== null) {
    ctx.beginPath();
    ctx.moveTo(erase.prevX, erase.prevY);
    ctx.lineTo(x, y);
    ctx.stroke();
  }
  
  // Draw circle at current position
  ctx.beginPath();
  ctx.arc(x, y, brushSize * pressure * 0.75, 0, Math.PI * 2);
  ctx.fill();
  
  // Reset composite operation
  ctx.globalCompositeOperation = 'source-over';
  
  // Store current position for next draw call
  erase.prevX = x;
  erase.prevY = y;
}

// Initialize previous positions for drawing functions
drawSymmetry.prevPositions = [];
erase.prevX = null;
erase.prevY = null;

// ===========================================
// Particle System
// ===========================================

function createParticle(x, y, type = 'paint') {
  return {
    x: x,
    y: y,
    vx: (Math.random() - 0.5) * 4,
    vy: (Math.random() - 0.5) * 4,
    size: Math.random() * 3 + 1,
    color: currentColor,
    life: 1.0,
    decay: Math.random() * 0.02 + 0.01,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.1,
    bounce: 0.8,
    type: type,
    trail: [{x: x, y: y}]
  };
}

function updateParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    
    // Update position
    p.x += p.vx;
    p.y += p.vy;
    
    // Add gravity
    p.vy += 0.1;
    
    // Add to trail
    p.trail.push({x: p.x, y: p.y});
    if (p.trail.length > 5) {
      p.trail.shift();
    }
    
    // Apply rotation
    p.rotation += p.rotationSpeed;
    
    // Boundary collisions with bounce
    if (p.x <= p.size || p.x >= canvas.width - p.size) {
      p.vx *= -p.bounce;
      p.x = Math.max(p.size, Math.min(canvas.width - p.size, p.x));
    }
    
    if (p.y <= p.size || p.y >= canvas.height - p.size) {
      p.vy *= -p.bounce;
      p.y = Math.max(p.size, Math.min(canvas.height - p.size, p.y));
    }
    
    // Apply air resistance
    p.vx *= 0.995;
    p.vy *= 0.995;
    
    // Update life
    p.life -= p.decay;
    
    // Remove dead particles
    if (p.life <= 0 || p.size <= 0.1) {
      particles.splice(i, 1);
    }
  }
}

function drawParticles() {
  particles.forEach(p => {
    // Draw particle trail
    if (p.trail.length > 1) {
      ctx.globalAlpha = p.life * 0.3;
      ctx.strokeStyle = p.color;
      ctx.lineWidth = p.size * 0.5;
      ctx.beginPath();
      ctx.moveTo(p.trail[0].x, p.trail[0].y);
      
      for (let i = 1; i < p.trail.length; i++) {
        ctx.lineTo(p.trail[i].x, p.trail[i].y);
      }
      ctx.stroke();
    }
    
    // Draw main particle
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.globalAlpha = p.life;
    
    switch (p.type) {
      case 'sparkle':
        // Draw star shape
        ctx.fillStyle = p.color;
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          const angle = (i * Math.PI * 2) / 5;
          const x = Math.cos(angle) * p.size;
          const y = Math.sin(angle) * p.size;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
        break;
        
      case 'kaleidoscope':
        // Draw multi-colored segments
        const segments = 6;
        for (let i = 0; i < segments; i++) {
          const angle = (i * Math.PI * 2) / segments;
          ctx.fillStyle = `hsl(${(Date.now() * 0.1 + i * 60) % 360}, 70%, 60%)`;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.arc(0, 0, p.size, angle, angle + Math.PI * 2 / segments);
          ctx.fill();
        }
        break;
        
      default:
        // Regular circular particle
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add inner glow
        if (p.life > 0.5) {
          ctx.globalAlpha = (p.life - 0.5) * 0.5;
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.5, 0, Math.PI * 2);
          ctx.fill();
        }
        break;
    }
    
    ctx.restore();
  });
  
  ctx.globalAlpha = 1.0;
}

function createPaintParticles(x, y, count = 5) {
  const particleType = currentTool === 'kaleidoscope' ? 'kaleidoscope' :
                      currentTool === 'watercolor' ? 'watercolor' : 'paint';
  
  for (let i = 0; i < count * pressure; i++) {
    particles.push(createParticle(
      x + (Math.random() - 0.5) * 10,
      y + (Math.random() - 0.5) * 10,
      particleType
    ));
  }
  
  // Add sparkles for special effects
  if (Math.random() < 0.3 && pressure > 1.5) {
    for (let i = 0; i < 2; i++) {
      particles.push(createParticle(x, y, 'sparkle'));
    }
  }
}

// ===========================================
// Half-Circle Rotational Toolbar Implementation
// ===========================================

function showToolbar() {
  toolbarVisible = true;
  const toolbar = document.getElementById('toolbar');
  toolbar.style.transform = 'translateY(0)';
  updateToolbarDisplay();
  
  // Auto-hide after 3 seconds of inactivity
  clearTimeout(window.toolbarHideTimeout);
  window.toolbarHideTimeout = setTimeout(() => {
    if (toolbarVisible) {
      hideToolbar();
    }
  }, 3000);
}

function hideToolbar() {
  toolbarVisible = false;
  const toolbar = document.getElementById('toolbar');
  toolbar.style.transform = 'translateY(100%)';
  clearTimeout(window.toolbarHideTimeout);
}

function updateToolbarDisplay() {
  const toolItems = document.querySelectorAll('.tool-item');
  const centerTool = document.getElementById('centerTool');
  
  toolItems.forEach((item, index) => {
    // Calculate position in half-circle (180 degrees spread)
    const totalAngle = 180; // Half circle
    const startAngle = -90; // Start from top
    const angleStep = totalAngle / (tools.length - 1);
    const angle = startAngle + (index * angleStep) + toolbarRotation;
    
    // Convert to radians and calculate position
    const radian = (angle * Math.PI) / 180;
    const radius = 18; // vw units for half-circle radius
    const x = Math.cos(radian) * radius;
    const y = Math.sin(radian) * radius;
    
    // Apply transform with smooth animation
    item.style.transform = `translate(${x}vw, ${y}vw) scale(${index === selectedToolIndex ? 1.1 : 1})`;
    item.classList.toggle('selected', index === selectedToolIndex);
    
    // Add rotation animation effect
    item.style.transition = 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)';
  });
  
  // Update center tool display with selected tool
  if (centerTool) {
    const selectedTool = tools[selectedToolIndex];
    centerTool.innerHTML = selectedTool.icon;
    centerTool.title = selectedTool.label;
    centerTool.style.transform = 'translate(-50%, -50%) scale(1.1)';
    centerTool.style.transition = 'transform 0.2s ease';
    
    // Reset scale after animation
    setTimeout(() => {
      centerTool.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 200);
  }
}

function rotateToolbar(direction) {
  // Smooth rotation animation
  toolbarRotation += direction * 15; // 15 degrees per step
  
  // Keep rotation within reasonable bounds
  if (toolbarRotation > 360) toolbarRotation -= 360;
  if (toolbarRotation < -360) toolbarRotation += 360;
  
  updateToolbarDisplay();
}

function selectTool(index) {
  if (index < 0 || index >= tools.length) return;
  
  selectedToolIndex = index;
  currentTool = tools[index].name;
  updateToolbarDisplay();
  
  // Tool-specific setup
  switch (currentTool) {
    case 'symmetry':
      symmetryEnabled = true;
      symmetryLines = 4;
      break;
    case 'kaleidoscope':
      symmetryEnabled = false;
      break;
    case 'watercolor':
      symmetryEnabled = false;
      break;
    case 'eraser':
      symmetryEnabled = false;
      break;
    default:
      symmetryEnabled = false;
  }
  
  // Provide haptic feedback (visual pulse)
  const centerTool = document.getElementById('centerTool');
  if (centerTool) {
    centerTool.style.transform = 'translate(-50%, -50%) scale(1.2)';
    setTimeout(() => {
      centerTool.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 150);
  }
  
  console.log(`Selected tool: ${tools[index].label}`);
}

// ===========================================
// LLM Integration
// ===========================================

function requestCreativeAdvice() {
  if (typeof PluginMessageHandler !== 'undefined') {
    const payload = {
      message: 'Give me creative painting advice or inspiration in 2-3 sentences. Be encouraging and artistic.',
      useLLM: true,
      wantsR1Response: true
    };
    PluginMessageHandler.postMessage(JSON.stringify(payload));
  }
}

function captureAndEmail() {
  if (typeof PluginMessageHandler !== 'undefined') {
    const imageData = canvas.toDataURL('image/png');
    const payload = {
      message: `Please send this digital artwork to my email: ${imageData}`,
      useLLM: true
    };
    PluginMessageHandler.postMessage(JSON.stringify(payload));
  }
}

function updateColorPalette() {
  const swatches = document.querySelectorAll('.color-swatch');
  swatches.forEach(swatch => {
    swatch.classList.remove('active');
    if (swatch.dataset.color === currentColor) {
      swatch.classList.add('active');
    }
  });
}

function activateTextTool() {
  // Simple text input for R1 device
  const text = prompt('Enter text to add:') || 'Hello R1!';
  if (text) {
    ctx.font = `${brushSize * 4}px Arial`;
    ctx.fillStyle = currentColor;
    ctx.textAlign = 'center';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    saveState();
  }
}

// ===========================================
// Event Handlers
// ===========================================

function handleMouseDown(e) {
  isDrawing = true;
  const rect = canvas.getBoundingClientRect();
  const x = (e.clientX - rect.left) * (canvas.width / rect.width);
  const y = (e.clientY - rect.top) * (canvas.height / rect.height);
  
  // Create particles on drawing start
  if (currentTool !== 'eraser') {
    createPaintParticles(x, y, 3);
  }
  
  draw(x, y);
}

function handleMouseMove(e) {
  if (!isDrawing) return;
  
  const rect = canvas.getBoundingClientRect();
  const x = (e.clientX - rect.left) * (canvas.width / rect.width);
  const y = (e.clientY - rect.top) * (canvas.height / rect.height);
  
  // Create particles during movement
  if (currentTool !== 'eraser' && Math.random() < 0.7) {
    createPaintParticles(x, y, 1);
  }
  
  draw(x, y);
}

function handleMouseUp() {
  if (isDrawing) {
    isDrawing = false;
    saveState();
  }
}

function draw(x, y) {
  switch (currentTool) {
    case 'kaleidoscope':
      drawKaleidoscope(x, y);
      break;
    case 'symmetry':
      drawSymmetry(x, y);
      break;
    case 'watercolor':
      drawWatercolor(x, y);
      break;
    case 'eraser':
      erase(x, y);
      break;
  }
}

// ===========================================
// R1 Hardware Event Handlers with Enhanced Toolbar Navigation
// ===========================================

window.addEventListener('scrollUp', () => {
  if (toolbarVisible) {
    // Navigate through tools clockwise
    selectedToolIndex = (selectedToolIndex - 1 + tools.length) % tools.length;
    selectTool(selectedToolIndex);
    
    // Add subtle rotation effect
    rotateToolbar(-1);
    
    // Reset auto-hide timer
    showToolbar();
  } else {
    // Show toolbar when scrolling
    showToolbar();
  }
});

window.addEventListener('scrollDown', () => {
  if (toolbarVisible) {
    // Navigate through tools counter-clockwise
    selectedToolIndex = (selectedToolIndex + 1) % tools.length;
    selectTool(selectedToolIndex);
    
    // Add subtle rotation effect
    rotateToolbar(1);
    
    // Reset auto-hide timer
    showToolbar();
  } else {
    // Show toolbar when scrolling
    showToolbar();
  }
});

window.addEventListener('sideClick', () => {
  if (toolbarVisible) {
    const selectedTool = tools[selectedToolIndex];
    
    // Handle special tools
    if (selectedTool.name === 'llm') {
      requestCreativeAdvice();
      hideToolbar();
      return;
    } else if (selectedTool.name === 'palette') {
      // Generate random palette and update current color
      const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#FE5F00', '#FFFFFF'];
      currentColor = colors[Math.floor(Math.random() * colors.length)];
      
      // Update color palette UI
      updateColorPalette();
      hideToolbar();
      return;
    } else if (selectedTool.name === 'text') {
      // Activate text input mode
      activateTextTool();
      hideToolbar();
      return;
    }
    
    // Hide toolbar after selection
    hideToolbar();
  } else {
    // Show toolbar
    showToolbar();
  }
});

// ===========================================
// Initialization and Main Loop
// ===========================================

function initApp() {
  initCanvas();
  
  // Set up event listeners
  canvas.addEventListener('mousedown', handleMouseDown);
  canvas.addEventListener('mousemove', handleMouseMove);
  canvas.addEventListener('mouseup', handleMouseUp);
  canvas.addEventListener('mouseleave', handleMouseUp);
  
  // Touch events for mobile
  canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousedown', {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
  });
  
  canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousemove', {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
  });
  
  canvas.addEventListener('touchend', (e) => {
    e.preventDefault();
    const mouseEvent = new MouseEvent('mouseup', {});
    canvas.dispatchEvent(mouseEvent);
  });
  
  // Button event listeners
  document.getElementById('undoBtn').addEventListener('click', undo);
  document.getElementById('resetBtn').addEventListener('click', resetCanvas);
  
  // Tool item event listeners
  document.querySelectorAll('.tool-item').forEach((item, index) => {
    item.addEventListener('click', () => {
      selectTool(index);
      hideToolbar();
    });
  });
  
  // Color swatch event listeners
  document.querySelectorAll('.color-swatch').forEach(swatch => {
    swatch.addEventListener('click', () => {
      currentColor = swatch.dataset.color;
      updateColorPalette();
    });
  });
  
  // Initialize color palette
  updateColorPalette();
  
  // Start animation loop
  function animate() {
    updateParticles();
    drawParticles();
    requestAnimationFrame(animate);
  }
  
  animate();
  
  console.log('R1 Digital Painting App initialized');
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);

// Handle LLM responses
window.handleLLMResponse = function(response) {
  const adviceText = document.getElementById('adviceText');
  const adviceOverlay = document.getElementById('adviceOverlay');
  
  if (adviceText && adviceOverlay) {
    adviceText.textContent = response;
    adviceOverlay.style.display = 'flex';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      adviceOverlay.style.display = 'none';
    }, 5000);
  }
};

// Close advice overlay when clicked
document.addEventListener('click', (e) => {
  const adviceOverlay = document.getElementById('adviceOverlay');
  if (adviceOverlay && e.target === adviceOverlay) {
    adviceOverlay.style.display = 'none';
  }
});