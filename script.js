const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = '#000000';
const DEFAULT_MODE = 'color'

let currentSize = DEFAULT_SIZE;
let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;

function setSize(newSize){
  currentSize = newSize;
}

function setColor(newColor){
  currentColor = newColor;
}

function setNewMode(newMode){
  currentMode = newMode;
  setMode();
}

const grid = document.getElementById('grid-container');
const colorBtn = document.getElementById('color');
const rainbowBtn = document.getElementById('rainbow');
const eraserBtn = document.getElementById('eraser');
const clearBtn = document.getElementById('clear');
const sizeSlider = document.getElementById('slider');
const gridLayoutDisplay = document.getElementById('grid-layout-display');
const colorPicker = document.getElementById('color-picker');
const gridElements = document.querySelectorAll('grid-element');

colorBtn.onclick = () => {setNewMode('color')};
rainbowBtn.onclick = () => {setNewMode('rainbow')};
eraserBtn.onclick = () => {setNewMode('eraser')};
clearBtn.onclick = () => clearGrid(currentSize);
sizeSlider.onmousemove = (e) => {changeSizeValue(e.target.value)};
sizeSlider.onchange = (e) => {updateSize(e.target.value)};
colorPicker.oninput = (e) => {setColor(e.target.value)};

let isMouseDown = false;
document.body.addEventListener('mousedown', () => {isMouseDown = true;});
document.body.addEventListener('mouseup', () => {isMouseDown = false});

function updateSize(value){
  setSize(value);
  clearGrid(currentSize);
}

function changeSizeValue(value){
  gridLayoutDisplay.innerText = `Current Layout: ${value} X ${value}`;
}

function setupGrid(size){
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`

  let div;
  for(let i = 0; i < (size * size); i++){
    div = document.createElement('div');
    div.classList.add('grid-element');
    grid.appendChild(div);
  }
}

function clearGrid(size){
  grid.innerHTML = "";
  setupGrid(size);
}

function colorMode(){
  grid.addEventListener('mouseover', (e) => {
    if(isMouseDown)
      e.target.style.backgroundColor = currentColor;
  });
}

function rainbowMode(){
  grid.addEventListener('mouseover', (e) => {
    if(isMouseDown){
      const randomR = Math.floor(Math.random() * 255);
      const randomG = Math.floor(Math.random() * 255);
      const randomB = Math.floor(Math.random() * 255);
      e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
    }
  });
}

function eraserMode(){
  grid.addEventListener('mouseover', (e) => {
    if(isMouseDown)
      e.target.style.backgroundColor = '#FFFFFF';
  });
}

function setMode(){
  switch(currentMode){
    case 'rainbow':
      highlightModeButton(currentMode);
      rainbowMode();
      break;
    case 'eraser':
      highlightModeButton(currentMode);
      eraserMode();
      break;
    default:
      highlightModeButton(currentMode);
      colorMode();
  }
}

function highlightModeButton(mode){
  if(mode === 'rainbow'){
    colorBtn.classList.remove('active');
    eraserBtn.classList.remove('active');
    rainbowBtn.classList.add('active');
  } else if (mode === 'eraser'){
    colorBtn.classList.remove('active');
    rainbowBtn.classList.remove('active');
    eraserBtn.classList.add('active')
  } else {
    rainbowBtn.classList.remove('active');
    eraserBtn.classList.remove('active');
    colorBtn.classList.add('active')
  }
}

window.onload = () => {
  setupGrid(DEFAULT_SIZE);
  setMode(DEFAULT_MODE);
}