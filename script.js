const div = document.createElement('div');
const container = document.querySelector('.container');
const sideLengthSlider = document.querySelector('#tiles-per-side');
const sliderSpan = document.querySelector('#slider-span');
sliderSpan.value = 8;
const clearButton = document.querySelector('#clear-button');
const colorPicker = document.querySelector('#color-picker');

let mouseDown = false;


let canvasWidth = 480;
let tilesPerSide = 8;
let numberOfTiles = tilesPerSide**2;

let mainColor = "darkblue";

function fillCanvas() {
    let counter = 1;
    let tileWidth = canvasWidth/tilesPerSide + 'px';
    let tileHeight = tileWidth;
    while (counter <= numberOfTiles) {
        container.appendChild(div.cloneNode());
        container.childNodes[counter-1].classList.add('tile');
        

        container.childNodes[counter-1].style.width = tileWidth;
        container.childNodes[counter-1].style.height = tileHeight;
        
        container.childNodes[counter-1].addEventListener('mousedown', (event) => {
            event.target.style.backgroundColor = mainColor;
        })
        container.childNodes[counter-1].addEventListener('mouseenter', (event) => {
            if (mouseDown) {
                event.target.style.backgroundColor = mainColor;
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

// Runtime

fillCanvas();


// Eventlisteners
container.addEventListener('dragstart', (event)=>{
    event.preventDefault();
})
sideLengthSlider.addEventListener('input', ()=>{
    const input = sideLengthSlider.value;
    sliderSpan.innerText = input;
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