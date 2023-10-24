// Delcarations

const div = document.createElement('div');
const container = document.querySelector('.container');
const sizeSlider = document.querySelector('#tiles-per-side');
const sliderSpan = document.querySelector('#slider-span');
sliderSpan.value = 8;
const clearButton = document.querySelector('#clear-button');
const colorPicker = document.querySelector('#color-picker');
const colorModeButtons = document.querySelectorAll('.color-modes button');
console.log(colorModeButtons);
const colorMode = document.querySelector('.color-mode');
const rainbowMode = document.querySelector('.rainbow-mode');
const eraserMode = document.querySelector('.eraser-mode');
const defaultBackgroundColor = 'hsl(184, 36%, 83%)';
const tileButton = document.querySelector('.tile-button')

let mouseDown = false;

let canvasWidth = [...window.getComputedStyle(container).width].filter((char)=>{
    return ['0','1','2','3','4','5','6','7','8','9'].includes(char);
}).join('');
let tilesPerSide = 8;
let numberOfTiles = tilesPerSide**2;

let mainColor = "darkblue";

// Functions

function fillCanvas() {
    let counter = 1;
    let tileWidth = canvasWidth/tilesPerSide + 'px';
    let tileHeight = tileWidth;
    while (counter <= numberOfTiles) {
        container.appendChild(div.cloneNode());
        container.childNodes[counter-1].classList.add('tile', 'tile-border');
        

        container.childNodes[counter-1].style.width = tileWidth;
        container.childNodes[counter-1].style.height = tileHeight;
        
        container.childNodes[counter-1].addEventListener('mousedown', (event)=>{
            setColor(event.target);
        })
        container.childNodes[counter-1].addEventListener('mouseenter', (event)=>{
            if (mouseDown){
                setColor(event.target);
            }
        })
        
        counter++;
    }
}

function clearCanvas() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

function resizeCanvas(sideLength) {
    tilesPerSide = sideLength;
    numberOfTiles = sideLength**2;
}

function getRandomColor() {
    return('rgb(' + Math.floor(Math.random()*255)+ ',' + Math.floor(Math.random()*255) + ',' + Math.floor(Math.random()*255) + ')');
}

function getColorMode() {
    for (const button of colorModeButtons) {
        if (button.classList.contains('active')){
            return button;
        }
    }
}

function setColor(tile) {
    if (getColorMode() === colorMode){
        tile.style.backgroundColor = mainColor;
    }
    else if (getColorMode() === rainbowMode){
        tile.style.backgroundColor = getRandomColor();
    }
    else if (getColorMode() === eraserMode){
        tile.style.backgroundColor = defaultBackgroundColor;
    }
}

// Runtime

fillCanvas();

// Eventlisteners
container.addEventListener('dragstart', (event)=>{
    event.preventDefault();
})
sizeSlider.addEventListener('input', ()=>{
    const input = sizeSlider.value;
    sliderSpan.innerText = input+'x'+input;
    clearCanvas();
    resizeCanvas(parseInt(input));
    fillCanvas();
})

clearButton.addEventListener('click', ()=>{
    clearCanvas();
    fillCanvas();
})

colorPicker.addEventListener('input', ()=>{
    mainColor = colorPicker.value;
})

container.addEventListener('mousedown', ()=>{
    mouseDown = true;
})

container.addEventListener('mouseup', ()=>{
    mouseDown = false;
})

for (const button of colorModeButtons) {
    button.addEventListener('click', ()=>{
    if (button.classList.contains('active')){
        return;
    }
    else {
        for (const item of colorModeButtons) {
            if (item.classList.contains('active')){
                item.classList.toggle('active');
            }
        }
        event.target.classList.toggle('active');
    }
})
}

tileButton.addEventListener('click', ()=>{
    tileButton.classList.toggle('active');
    for (const tile of container.childNodes) {
        tile.classList.toggle('tile-border');
    }
})