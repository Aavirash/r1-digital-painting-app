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
let sacredShapes = [];
let accelerometerData = { x: 0, y: 0, z: 0 };
let pressure = 1.0;
let undoStack = [];
let symmetryEnabled = false;
let symmetryLines = 4;
let particleSystemActive = false;
let lastShakeTime = 0;
let canvasColorPickerMode = false;
let audioContext = null;
let clickCount = 0;

const tools = [
  { name: 'brush', icon: '<i class="fas fa-paint-brush"></i>', label: 'Brush' },
  { name: 'kaleidoscope', icon: '<i class="fas fa-magic"></i>', label: 'Kaleidoscope' },
  { name: 'symmetry', icon: '<i class="fas fa-sync-alt"></i>', label: 'Symmetry' },
  { name: 'drip', icon: '<i class="fas fa-fill-drip"></i>', label: 'Drip Paint' },
  { name: 'lines', icon: '<i class="fas fa-slash"></i>', label: 'Lines' },
  { name: 'llm', icon: '<i class="fas fa-microphone"></i>', label: 'AI Advice' },
  { name: 'sacred', icon: '<i class="fas fa-spa"></i>', label: 'Sacred Geometry' }
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
  sacredShapes.length = 0;
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
// Sacred Geometry System Implementation
// ===========================================

function initAudio() {
  // Create audio context for sound effects
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
}

function playSacredSound(frequency, duration = 1.5) {
  if (!audioContext) return;
  
  const now = audioContext.currentTime;
  
  // Create a soothing sine wave
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.type = 'sine';
  oscillator.frequency.value = frequency;
  
  // Gentle attack and release for sacred sound
  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(0.3, now + 0.1);
  gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration);
  
  oscillator.start(now);
  oscillator.stop(now + duration);
}

function createSacredShape(x, y) {
  // Create a sacred geometry shape
  const shapes = ['circle', 'triangle', 'square', 'pentagon', 'hexagon', 'star'];
  const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
  
  return {
    x: x,
    y: y,
    type: shapeType,
    size: 20 + Math.random() * 30,
    color: `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`,
    life: 1.0,
    decay: 0.01 + Math.random() * 0.01,
    rotation: Math.random() * Math.PI * 2
  };
}

function addSacredShape(x, y) {
  // Add sacred geometry shape at the touch position
  const shape = createSacredShape(x, y);
  sacredShapes.push(shape);
  
  // Play a sacred sound based on the shape type
  const frequencies = {
    'circle': 261.63,    // C4
    'triangle': 329.63,  // E4
    'square': 392.00,    // G4
    'pentagon': 440.00,  // A4
    'hexagon': 523.25,   // C5
    'star': 659.25       // E5
  };
  
  const frequency = frequencies[shape.type] || 440.00;
  playSacredSound(frequency, 1.5);
  
  // Increment click count for musical progression
  clickCount++;
  
  // Play harmonic sounds every few clicks
  if (clickCount % 3 === 0) {
    // Play a chord
    playSacredSound(frequency * 1.25, 1.5); // Major third
    playSacredSound(frequency * 1.5, 1.5);  // Perfect fifth
  }
}

function updateSacredShapes() {
  // Apply accelerometer data to shapes
  const accelFactor = 0.05;
  
  for (let i = sacredShapes.length - 1; i >= 0; i--) {
    const s = sacredShapes[i];
    
    // Update position with accelerometer influence
    s.x += accelerometerData.x * accelFactor;
    s.y += accelerometerData.y * accelFactor;
    
    // Boundary wrapping (shapes reappear on opposite side)
    if (s.x < -s.size) s.x = canvas.width + s.size;
    if (s.x > canvas.width + s.size) s.x = -s.size;
    if (s.y < -s.size) s.y = canvas.height + s.size;
    if (s.y > canvas.height + s.size) s.y = -s.size;
    
    // Update life
    s.life -= s.decay;
    
    // Remove dead shapes
    if (s.life <= 0) {
      sacredShapes.splice(i, 1);
    }
  }
}

function drawSacredShapes() {
  // Draw all sacred geometry shapes
  sacredShapes.forEach(s => {
    ctx.save();
    ctx.globalAlpha = s.life;
    ctx.translate(s.x, s.y);
    ctx.rotate(s.rotation);
    
    ctx.strokeStyle = s.color;
    ctx.lineWidth = 2;
    ctx.fillStyle = s.color.replace(')', ', 0.2)').replace('hsl', 'hsla');
    
    switch (s.type) {
      case 'circle':
        ctx.beginPath();
        ctx.arc(0, 0, s.size, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, 0, s.size * 0.5, 0, Math.PI * 2);
        ctx.stroke();
        break;
        
      case 'triangle':
        ctx.beginPath();
        for (let i = 0; i < 3; i++) {
          const angle = (i * Math.PI * 2) / 3;
          const x = Math.cos(angle) * s.size;
          const y = Math.sin(angle) * s.size;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
        break;
        
      case 'square':
        ctx.beginPath();
        ctx.rect(-s.size, -s.size, s.size * 2, s.size * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-s.size * 0.7, -s.size * 0.7);
        ctx.lineTo(s.size * 0.7, s.size * 0.7);
        ctx.moveTo(s.size * 0.7, -s.size * 0.7);
        ctx.lineTo(-s.size * 0.7, s.size * 0.7);
        ctx.stroke();
        break;
        
      case 'pentagon':
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          const angle = (i * Math.PI * 2) / 5 - Math.PI / 2;
          const x = Math.cos(angle) * s.size;
          const y = Math.sin(angle) * s.size;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
        break;
        
      case 'hexagon':
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI * 2) / 6;
          const x = Math.cos(angle) * s.size;
          const y = Math.sin(angle) * s.size;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
        break;
        
      case 'star':
        ctx.beginPath();
        for (let i = 0; i < 10; i++) {
          const angle = (i * Math.PI * 2) / 10 - Math.PI / 2;
          const radius = i % 2 === 0 ? s.size : s.size * 0.5;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
        break;
    }
    
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

function cycleTool(direction) {
  // Cycle through tools
  if (direction > 0) {
    // Next tool
    selectedToolIndex = (selectedToolIndex + 1) % tools.length;
  } else {
    // Previous tool
    selectedToolIndex = (selectedToolIndex - 1 + tools.length) % tools.length;
  }
  
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
    case 'sacred':
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
    case 'sacred':
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
  
  // Handle sacred geometry tool
  if (currentTool === 'sacred') {
    addSacredShape(x, y);
    return;
  }
  
  draw(x, y);
}

function handleMouseMove(e) {
  if (!isDrawing) return;
  
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  // Handle sacred geometry tool
  if (currentTool === 'sacred') {
    if (Math.random() < 0.3) {
      addSacredShape(x, y);
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
      
      // Check for shake (but not for sacred geometry tool)
      if (currentTool !== 'sacred' && (deltaX > shakeThreshold || deltaY > shakeThreshold || deltaZ > shakeThreshold)) {
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
  // Cycle to previous tool and show selector
  cycleTool(-1); // Previous tool
  if (!toolbarVisible) {
    showToolSelector();
  }
  
  // Hide selector after a short delay
  setTimeout(() => {
    if (toolbarVisible) {
      hideToolSelector();
    }
  }, 1000);
});

window.addEventListener('scrollDown', () => {
  // Cycle to next tool and show selector
  cycleTool(1); // Next tool
  if (!toolbarVisible) {
    showToolSelector();
  }
  
  // Hide selector after a short delay
  setTimeout(() => {
    if (toolbarVisible) {
      hideToolSelector();
    }
  }, 1000);
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
  // Arrow up to cycle to previous tool
  if (e.key === 'ArrowUp') {
    cycleTool(-1); // Previous tool
    if (!toolbarVisible) {
      showToolSelector();
    }
    
    // Hide selector after a short delay
    setTimeout(() => {
      if (toolbarVisible) {
        hideToolSelector();
      }
    }, 1000);
    
    e.preventDefault();
  }
  
  // Arrow down to cycle to next tool
  if (e.key === 'ArrowDown') {
    cycleTool(1); // Next tool
    if (!toolbarVisible) {
      showToolSelector();
    }
    
    // Hide selector after a short delay
    setTimeout(() => {
      if (toolbarVisible) {
        hideToolSelector();
      }
    }, 1000);
    
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
    cycleTool(1); // Next tool
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
    // Update and draw sacred shapes
    updateSacredShapes();
    drawSacredShapes();
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