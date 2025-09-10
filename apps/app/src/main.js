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
let toolbarVisible = false; // Hidden by default
let selectedToolIndex = 0;
let particles = [];
let accelerometerData = { x: 0, y: 0, z: 0 };
let pressure = 1.0;
let undoStack = [];
let symmetryEnabled = false;
let symmetryLines = 4;
let particleSystemActive = false;
let lastShakeTime = 0;
let canvasColorPickerMode = false;
let audioContext = null;

const tools = [
  { name: 'brush', icon: '<i class="fas fa-paint-brush"></i>', label: 'Brush' },
  { name: 'kaleidoscope', icon: '<i class="fas fa-magic"></i>', label: 'Kaleidoscope' },
  { name: 'symmetry', icon: '<i class="fas fa-sync-alt"></i>', label: 'Symmetry' },
  { name: 'drip', icon: '<i class="fas fa-fill-drip"></i>', label: 'Drip Paint' },
  { name: 'lines', icon: '<i class="fas fa-slash"></i>', label: 'Lines' },
  { name: 'llm', icon: '<i class="fas fa-microphone"></i>', label: 'AI Advice' },
  { name: 'particles', icon: '<i class="fas fa-sparkles"></i>', label: 'Meditation' }
];

// ===========================================
// Canvas Setup and Drawing Functions
// ===========================================

function initCanvas() {
  canvas = document.getElementById('paintCanvas');
  ctx = canvas.getContext('2d');
  
  // Set canvas size to fill entire screen
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
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
    padding: 10px 20px;
    border-radius: 10px;
    font-size: 16px;
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
  // Clear canvas without confirmation
  ctx.fillStyle = canvasBackgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  saveState();
  
  // Reset all drawing states
  if (drawSymmetry.prevPositions) drawSymmetry.prevPositions = [];
  particles.length = 0;
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
// Particle System Implementation (Simple White Meditative Dots)
// ===========================================

function initAudio() {
  // Create audio context for sound effects
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
}

function playMeditativeSound(frequency, duration = 2.0) {
  if (!audioContext) return;
  
  const now = audioContext.currentTime;
  
  // Create a soothing sine wave
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.type = 'sine';
  oscillator.frequency.value = frequency;
  
  // Gentle attack and release for meditative sound
  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(0.2, now + 0.1);
  gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration);
  
  oscillator.start(now);
  oscillator.stop(now + duration);
}

function createMeditativeParticle(x, y) {
  // Create a simple white meditative dot particle
  return {
    x: x,
    y: y,
    vx: (Math.random() - 0.5) * 2,
    vy: (Math.random() - 0.5) * 2,
    size: 2 + Math.random() * 4,
    color: 'rgba(255, 255, 255, 0.8)', // White with transparency
    life: 1.0,
    decay: 0.015 + Math.random() * 0.01,
    shine: Math.random() * 0.3 + 0.7 // Shine factor for glossy effect
  };
}

function addMeditativeParticles(x, y, count = 8) {
  // Add meditative particles at the touch position
  for (let i = 0; i < count; i++) {
    particles.push(createMeditativeParticle(
      x + (Math.random() - 0.5) * 20,
      y + (Math.random() - 0.5) * 20
    ));
  }
  
  // Play a soothing meditative sound
  const frequencies = [130.81, 164.81, 196.00, 261.63, 329.63, 392.00, 523.25]; // C3, E3, G3, C4, E4, G4, C5
  const randomFreq = frequencies[Math.floor(Math.random() * frequencies.length)];
  playMeditativeSound(randomFreq, 2.0);
}

function updateParticles() {
  // Apply accelerometer data to particles
  const accelFactor = 0.1;
  
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    
    // Update position with velocity and accelerometer influence
    p.x += p.vx + accelerometerData.x * accelFactor;
    p.y += p.vy + accelerometerData.y * accelFactor;
    
    // Boundary wrapping (particles reappear on opposite side)
    if (p.x < -p.size) p.x = canvas.width + p.size;
    if (p.x > canvas.width + p.size) p.x = -p.size;
    if (p.y < -p.size) p.y = canvas.height + p.size;
    if (p.y > canvas.height + p.size) p.y = -p.size;
    
    // Apply air resistance
    p.vx *= 0.98;
    p.vy *= 0.98;
    
    // Update life
    p.life -= p.decay;
    
    // Remove dead particles
    if (p.life <= 0) {
      particles.splice(i, 1);
    }
  }
}

function drawParticles() {
  // Draw all particles as simple white meditative dots
  particles.forEach(p => {
    ctx.save();
    ctx.globalAlpha = p.life;
    
    // Create a shiny white dot effect
    const gradient = ctx.createRadialGradient(
      p.x - p.size * 0.3, 
      p.y - p.size * 0.3, 
      0, 
      p.x, 
      p.y, 
      p.size
    );
    
    // Add shine effect
    gradient.addColorStop(0, `rgba(255, 255, 255, ${p.shine})`);
    gradient.addColorStop(0.5, p.color);
    gradient.addColorStop(1, 'transparent');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
  });
  
  ctx.globalAlpha = 1.0;
}

// ===========================================
// Simplified Tool Selector Implementation
// ===========================================

function showToolSelector() {
  toolbarVisible = true;
  const selector = document.getElementById('toolSelector');
  selector.classList.remove('hidden');
  selector.classList.add('visible');
  updateToolSelector();
}

function hideToolSelector() {
  toolbarVisible = false;
  const selector = document.getElementById('toolSelector');
  selector.classList.remove('visible');
  selector.classList.add('hidden');
}

function updateToolSelector() {
  const selectedTool = document.getElementById('selectedTool');
  
  // Update selected tool indicator
  if (selectedTool) {
    selectedTool.innerHTML = tools[selectedToolIndex].icon;
  }
}

function cycleTool() {
  // Cycle through tools
  selectedToolIndex = (selectedToolIndex + 1) % tools.length;
  currentTool = tools[selectedToolIndex].name;
  updateToolSelector();
  
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
    case 'particles':
      particleSystemActive = true;
      initAudio();
      break;
    default:
      symmetryEnabled = false;
      particleSystemActive = false;
  }
  
  console.log(`Selected tool: ${tools[selectedToolIndex].label}`);
}

function selectTool(index) {
  if (index < 0 || index >= tools.length) return;
  
  selectedToolIndex = index;
  currentTool = tools[index].name;
  updateToolSelector();
  
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
    case 'particles':
      particleSystemActive = true;
      initAudio();
      break;
    default:
      symmetryEnabled = false;
      particleSystemActive = false;
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

// ===========================================
// Canvas Color Picker Functionality
// ===========================================

function toggleCanvasColorPicker() {
  canvasColorPickerMode = !canvasColorPickerMode;
  
  const colorPicker = document.getElementById('colorPicker');
  const colorPalette = document.querySelector('.color-palette');
  
  if (canvasColorPickerMode) {
    // Show color picker popup
    colorPicker.style.display = 'flex';
    colorPalette.style.display = 'none';
  } else {
    // Hide color picker popup
    colorPicker.style.display = 'none';
    colorPalette.style.display = 'flex';
  }
}

function setCanvasBackgroundColor(color) {
  canvasBackgroundColor = color;
  // Update canvas background
  ctx.fillStyle = canvasBackgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  saveState();
  
  // Exit color picker mode
  canvasColorPickerMode = false;
  const colorPicker = document.getElementById('colorPicker');
  const colorPalette = document.querySelector('.color-palette');
  colorPicker.style.display = 'none';
  colorPalette.style.display = 'flex';
}

// ===========================================
// Event Handlers
// ===========================================

function handleMouseDown(e) {
  isDrawing = true;
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  // Handle particle system
  if (currentTool === 'particles') {
    addMeditativeParticles(x, y, 10);
    return;
  }
  
  draw(x, y);
}

function handleMouseMove(e) {
  if (!isDrawing) return;
  
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  // Handle particle system
  if (currentTool === 'particles') {
    if (Math.random() < 0.3) {
      addMeditativeParticles(x, y, 3);
    }
    return;
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
// Accelerometer and Shake Detection
// ===========================================

function initAccelerometer() {
  // Check if accelerometer is available
  if (window.DeviceMotionEvent) {
    window.addEventListener('devicemotion', (event) => {
      if (event.accelerationIncludingGravity) {
        accelerometerData.x = event.accelerationIncludingGravity.x || 0;
        accelerometerData.y = event.accelerationIncludingGravity.y || 0;
        accelerometerData.z = event.accelerationIncludingGravity.z || 0;
      }
    });
  }
  
  // Shake detection
  let lastX = 0, lastY = 0, lastZ = 0;
  let shakeThreshold = 15;
  
  window.addEventListener('devicemotion', (event) => {
    if (event.accelerationIncludingGravity) {
      const x = event.accelerationIncludingGravity.x || 0;
      const y = event.accelerationIncludingGravity.y || 0;
      const z = event.accelerationIncludingGravity.z || 0;
      
      const deltaX = Math.abs(x - lastX);
      const deltaY = Math.abs(y - lastY);
      const deltaZ = Math.abs(z - lastZ);
      
      // Update last values
      lastX = x;
      lastY = y;
      lastZ = z;
      
      // Check for shake (but not for particle system)
      if (currentTool !== 'particles' && (deltaX > shakeThreshold || deltaY > shakeThreshold || deltaZ > shakeThreshold)) {
        const now = Date.now();
        // Debounce shake events
        if (now - lastShakeTime > 1000) {
          lastShakeTime = now;
          clearCanvas(); // No confirmation needed
        }
      }
    }
  });
}

// ===========================================
// R1 Hardware Event Handlers and Keyboard Support
// ===========================================

window.addEventListener('scrollUp', () => {
  // Show tool selector
  showToolSelector();
});

window.addEventListener('scrollDown', () => {
  // Cycle through tools and show selector
  cycleTool();
  if (!toolbarVisible) {
    showToolSelector();
  }
});

window.addEventListener('sideClick', () => {
  const selectedTool = tools[selectedToolIndex];
  
  // Handle special tools
  if (selectedTool.name === 'llm') {
    requestCreativeAdvice();
    return;
  }
  
  // Toggle tool selector visibility
  if (toolbarVisible) {
    hideToolSelector();
  } else {
    showToolSelector();
  }
});

// Keyboard support for testing
document.addEventListener('keydown', (e) => {
  // Arrow up to show tool selector
  if (e.key === 'ArrowUp') {
    showToolSelector();
    e.preventDefault();
  }
  
  // Arrow down to cycle through tools
  if (e.key === 'ArrowDown') {
    cycleTool();
    if (!toolbarVisible) {
      showToolSelector();
    }
    e.preventDefault();
  }
  
  // Enter key to simulate side button click
  if (e.key === 'Enter') {
    const selectedTool = tools[selectedToolIndex];
    
    // Handle special tools
    if (selectedTool.name === 'llm') {
      requestCreativeAdvice();
      return;
    }
    
    // Toggle tool selector visibility
    if (toolbarVisible) {
      hideToolSelector();
    } else {
      showToolSelector();
    }
    e.preventDefault();
  }
});

// ===========================================
// Initialization and Main Loop
// ===========================================

function initApp() {
  initCanvas();
  initAccelerometer();
  
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
  document.getElementById('canvasColorBtn').addEventListener('click', toggleCanvasColorPicker);
  document.getElementById('closeSelector').addEventListener('click', hideToolSelector);
  document.getElementById('selectedTool').addEventListener('click', () => {
    cycleTool();
  });
  
  // Color swatch event listeners (regular palette)
  document.querySelectorAll('.color-palette .color-swatch').forEach(swatch => {
    swatch.addEventListener('click', () => {
      currentColor = swatch.dataset.color;
      updateColorPalette();
    });
  });
  
  // Color swatch event listeners (canvas color picker)
  document.querySelectorAll('#colorPicker .color-swatch').forEach(swatch => {
    swatch.addEventListener('click', () => {
      setCanvasBackgroundColor(swatch.dataset.color);
    });
  });
  
  // Initialize color palette
  updateColorPalette();
  
  // Start animation loop
  function animate() {
    // Update and draw particles
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

// Hide tool selector after a period of inactivity
let selectorTimeout;
document.addEventListener('mousemove', () => {
  clearTimeout(selectorTimeout);
  if (toolbarVisible) {
    selectorTimeout = setTimeout(() => {
      hideToolSelector();
    }, 3000); // Hide after 3 seconds of inactivity
  }
});