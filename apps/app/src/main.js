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
let currentTool = 'brush';
let currentColor = '#FE5F00';
let canvasBackgroundColor = '#000000';
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
  { name: 'brush', icon: '<i class="fas fa-paint-brush"></i>', label: 'Brush' },
  { name: 'kaleidoscope', icon: '<i class="fas fa-magic"></i>', label: 'Kaleidoscope' },
  { name: 'symmetry', icon: '<i class="fas fa-sync-alt"></i>', label: 'Symmetry' },
  { name: 'drip', icon: '<i class="fas fa-fill-drip"></i>', label: 'Drip Paint' },
  { name: 'lines', icon: '<i class="fas fa-slash"></i>', label: 'Lines' },
  { name: 'llm', icon: '<i class="fas fa-microphone"></i>', label: 'AI Advice' },
  { name: 'canvascolor', icon: '<i class="fas fa-palette"></i>', label: 'Canvas Color' }
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
  ctx.fillStyle = canvasBackgroundColor;
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
    // Simple clear animation
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
      
      currentRadius += 20;
      if (currentRadius < maxRadius + 20) {
        requestAnimationFrame(clearStep);
      } else {
        // Final clear
        ctx.fillStyle = canvasBackgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        saveState();
        
        // Reset drawing state
        if (drawSymmetry.prevPositions) drawSymmetry.prevPositions = [];
      }
    };
    
    clearStep();
  }
}

function resetCanvas() {
  // Quick reset without animation - for reset button
  ctx.fillStyle = canvasBackgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  saveState();
  
  // Reset all drawing states
  if (drawSymmetry.prevPositions) drawSymmetry.prevPositions = [];
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

function drawBrush(x, y) {
  ctx.fillStyle = currentColor;
  ctx.strokeStyle = currentColor;
  ctx.lineWidth = brushSize * pressure;
  
  // Clean pencil-like brush stroke with no drip effect
  if (drawBrush.prevX !== null && drawBrush.prevY !== null) {
    ctx.beginPath();
    ctx.moveTo(drawBrush.prevX, drawBrush.prevY);
    ctx.lineTo(x, y);
    ctx.stroke();
  }
  
  // Draw circle at current position
  ctx.beginPath();
  ctx.arc(x, y, brushSize * pressure * 0.5, 0, Math.PI * 2);
  ctx.fill();
  
  // Store current position for next draw call
  drawBrush.prevX = x;
  drawBrush.prevY = y;
}

function drawKaleidoscope(x, y) {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const segments = 12; // More segments for richer patterns
  
  ctx.fillStyle = currentColor;
  ctx.strokeStyle = currentColor;
  ctx.lineWidth = brushSize * pressure * 0.5;
  
  // Create clean geometric kaleidoscope effect
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
    
    // Draw clean geometric lines
    if (drawKaleidoscope.prevX !== null && drawKaleidoscope.prevY !== null) {
      const prevRotatedX = centerX + (drawKaleidoscope.prevX - centerX) * cos - (drawKaleidoscope.prevY - centerY) * sin;
      const prevRotatedY = centerY + (drawKaleidoscope.prevX - centerX) * sin + (drawKaleidoscope.prevY - centerY) * cos;
      
      const prevMirrorX = centerX + (centerX - prevRotatedX);
      const prevMirrorY = centerY + (centerY - prevRotatedY);
      
      // Draw primary line
      ctx.beginPath();
      ctx.moveTo(prevRotatedX, prevRotatedY);
      ctx.lineTo(rotatedX, rotatedY);
      ctx.stroke();
      
      // Draw mirror line
      ctx.beginPath();
      ctx.moveTo(prevMirrorX, prevMirrorY);
      ctx.lineTo(mirrorX, mirrorY);
      ctx.stroke();
    }
    
    // Draw primary point
    ctx.beginPath();
    ctx.arc(rotatedX, rotatedY, brushSize * pressure * 0.3, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw mirror point
    ctx.beginPath();
    ctx.arc(mirrorX, mirrorY, brushSize * pressure * 0.3, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Store current position for next draw call
  drawKaleidoscope.prevX = x;
  drawKaleidoscope.prevY = y;
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
  
  // Draw clean geometric brush strokes between previous and current positions
  if (drawSymmetry.prevPositions.length === symmetryPoints.length && isDrawing) {
    symmetryPoints.forEach((point, i) => {
      const prevPoint = drawSymmetry.prevPositions[i];
      
      // Draw clean geometric line
      ctx.beginPath();
      ctx.moveTo(prevPoint.x, prevPoint.y);
      ctx.lineTo(point.x, point.y);
      ctx.stroke();
      
      // Draw point at current position
      ctx.beginPath();
      ctx.arc(point.x, point.y, brushSize * pressure * 0.3, 0, Math.PI * 2);
      ctx.fill();
    });
  }
  
  // Store current positions for next draw call
  drawSymmetry.prevPositions = symmetryPoints;
}

function drawLines(x, y) {
  ctx.fillStyle = currentColor;
  ctx.strokeStyle = currentColor;
  ctx.lineWidth = brushSize * pressure;
  
  // Draw clean geometric lines
  if (drawLines.prevX !== null && drawLines.prevY !== null) {
    ctx.beginPath();
    ctx.moveTo(drawLines.prevX, drawLines.prevY);
    ctx.lineTo(x, y);
    ctx.stroke();
  }
  
  // Store current position for next draw call
  drawLines.prevX = x;
  drawLines.prevY = y;
}

function drawDripPaint(x, y) {
  ctx.fillStyle = currentColor;
  ctx.strokeStyle = currentColor;
  ctx.lineWidth = brushSize * pressure;
  
  // Draw the main stroke
  if (drawDripPaint.prevX !== null && drawDripPaint.prevY !== null) {
    ctx.beginPath();
    ctx.moveTo(drawDripPaint.prevX, drawDripPaint.prevY);
    ctx.lineTo(x, y);
    ctx.stroke();
  }
  
  // Draw circle at current position
  ctx.beginPath();
  ctx.arc(x, y, brushSize * pressure * 0.5, 0, Math.PI * 2);
  ctx.fill();
  
  // Add drip effect occasionally
  if (Math.random() < 0.1 * pressure) {
    const dripCount = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < dripCount; i++) {
      const dripX = x + (Math.random() - 0.5) * brushSize;
      const dripLength = brushSize * (Math.random() * 2 + 1) * pressure;
      
      ctx.beginPath();
      ctx.moveTo(dripX, y);
      ctx.lineTo(dripX, y + dripLength);
      ctx.stroke();
    }
  }
  
  // Store current position for next draw call
  drawDripPaint.prevX = x;
  drawDripPaint.prevY = y;
}

// Initialize previous positions for drawing functions
drawBrush.prevX = null;
drawBrush.prevY = null;
drawKaleidoscope.prevX = null;
drawKaleidoscope.prevY = null;
drawSymmetry.prevPositions = [];
drawLines.prevX = null;
drawLines.prevY = null;
drawDripPaint.prevX = null;
drawDripPaint.prevY = null;

// ===========================================
// Particle System (simplified for performance)
// ===========================================

function createParticle(x, y, type = 'simple') {
  return {
    x: x,
    y: y,
    vx: (Math.random() - 0.5) * 2,
    vy: (Math.random() - 0.5) * 2,
    size: Math.random() * 2 + 1,
    color: currentColor,
    life: 1.0,
    decay: Math.random() * 0.05 + 0.02,
    type: type
  };
}

function updateParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    
    // Update position
    p.x += p.vx;
    p.y += p.vy;
    
    // Apply gravity
    p.vy += 0.05;
    
    // Boundary collisions
    if (p.x <= p.size || p.x >= canvas.width - p.size) {
      p.vx *= -0.8;
      p.x = Math.max(p.size, Math.min(canvas.width - p.size, p.x));
    }
    
    if (p.y <= p.size || p.y >= canvas.height - p.size) {
      p.vy *= -0.8;
      p.y = Math.max(p.size, Math.min(canvas.height - p.size, p.y));
    }
    
    // Apply air resistance
    p.vx *= 0.98;
    p.vy *= 0.98;
    
    // Update life
    p.life -= p.decay;
    
    // Remove dead particles
    if (p.life <= 0 || p.size <= 0.1) {
      particles.splice(i, 1);
    }
  }
}

function drawParticles() {
  // Simplified particle drawing for better performance
  particles.forEach(p => {
    ctx.globalAlpha = p.life;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  });
  
  ctx.globalAlpha = 1.0;
}

function createPaintParticles(x, y, count = 3) {
  // Reduced particle count for better performance
  for (let i = 0; i < count * pressure; i++) {
    particles.push(createParticle(
      x + (Math.random() - 0.5) * 5,
      y + (Math.random() - 0.5) * 5,
      'simple'
    ));
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
    const radius = 20; // vw units for half-circle radius
    const x = Math.cos(radian) * radius;
    const y = Math.sin(radian) * radius;
    
    // Apply transform with smooth animation
    item.style.transform = `translate(${x}vw, ${y}vw) scale(${index === selectedToolIndex ? 1.1 : 1})`;
    item.classList.toggle('selected', index === selectedToolIndex);
    
    // Add rotation animation effect
    item.style.transition = 'all 0.2s ease';
  });
  
  // Update center tool display with selected tool
  if (centerTool) {
    const selectedTool = tools[selectedToolIndex];
    centerTool.innerHTML = selectedTool.icon;
    centerTool.title = selectedTool.label;
    centerTool.style.transform = 'translate(-50%, -50%) scale(1.1)';
    centerTool.style.transition = 'transform 0.1s ease';
    
    // Reset scale after animation
    setTimeout(() => {
      centerTool.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 100);
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
    case 'brush':
      symmetryEnabled = false;
      break;
    case 'lines':
      symmetryEnabled = false;
      break;
    case 'drip':
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
    }, 100);
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

function changeCanvasColor() {
  // Simple color picker for canvas background
  const colors = ['#000000', '#1a1a2e', '#2a2a4a', '#4a4a6a', '#6a6a8a', '#8a8aa8', '#aaaaa8', '#ffffff'];
  const colorNames = ['Black', 'Dark Blue', 'Dark Gray', 'Gray', 'Light Gray', 'Light Blue', 'Light Gray', 'White'];
  
  let colorList = '';
  colors.forEach((color, index) => {
    colorList += `${index + 1}. ${colorNames[index]} (${color})\n`;
  });
  
  const choice = prompt(`Choose canvas background color:\n${colorList}\nEnter number (1-8):`);
  
  if (choice && !isNaN(choice) && choice >= 1 && choice <= 8) {
    const selectedIndex = parseInt(choice) - 1;
    canvasBackgroundColor = colors[selectedIndex];
    
    // Update canvas background
    ctx.fillStyle = canvasBackgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Redraw current content
    if (undoStack.length > 0) {
      const currentState = undoStack[undoStack.length - 1];
      ctx.putImageData(currentState, 0, 0);
    }
    
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
  
  // Create minimal particles on drawing start for drip paint tool only
  if (currentTool === 'drip') {
    createPaintParticles(x, y, 1);
  }
  
  draw(x, y);
}

function handleMouseMove(e) {
  if (!isDrawing) return;
  
  const rect = canvas.getBoundingClientRect();
  const x = (e.clientX - rect.left) * (canvas.width / rect.width);
  const y = (e.clientY - rect.top) * (canvas.height / rect.height);
  
  // Create minimal particles during movement for drip paint tool only
  if (currentTool === 'drip' && Math.random() < 0.3) {
    createPaintParticles(x, y, 1);
  }
  
  draw(x, y);
}

function handleMouseUp() {
  if (isDrawing) {
    isDrawing = false;
    saveState();
    
    // Reset previous positions for all drawing functions
    drawBrush.prevX = null;
    drawBrush.prevY = null;
    drawKaleidoscope.prevX = null;
    drawKaleidoscope.prevY = null;
    drawLines.prevX = null;
    drawLines.prevY = null;
    drawDripPaint.prevX = null;
    drawDripPaint.prevY = null;
  }
}

function draw(x, y) {
  switch (currentTool) {
    case 'brush':
      drawBrush(x, y);
      break;
    case 'kaleidoscope':
      drawKaleidoscope(x, y);
      break;
    case 'symmetry':
      drawSymmetry(x, y);
      break;
    case 'lines':
      drawLines(x, y);
      break;
    case 'drip':
      drawDripPaint(x, y);
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
    } else if (selectedTool.name === 'canvascolor') {
      changeCanvasColor();
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
  
  // Start simplified animation loop
  function animate() {
    // Update and draw particles at a reduced rate for better performance
    if (Math.random() < 0.3) {
      updateParticles();
      drawParticles();
    }
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