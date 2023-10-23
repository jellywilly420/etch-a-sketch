const div = document.createElement('div');
const container = document.querySelector('.container');
const slider = document.querySelector('#slider');
const sliderValue = document.querySelector('span#value');

// let canvasWidth = window.getComputedStyle(container).getPropertyValue("width").split('').filter((char)=>{return char in ['0','1','2','3','4','5','6','7','8','9']}).join('');
let canvasWidth = 540;
let sideLength = 16;
let numberOfTiles = sideLength**2;

function fillCanvas(numberOfTiles) {
    while (container.firstChild) {container.removeChild(container.firstChild)}
    let counter = 1;
    while (counter <= numberOfTiles) {
        container.appendChild(div.cloneNode());
        container.childNodes[counter-1].classList.add('tile');
        container.childNodes[counter-1].style.width = canvasWidth/sideLength + 'px';
        container.childNodes[counter-1].style.height = canvasWidth/sideLength + 'px';

        container.childNodes[counter-1].addEventListener('mouseenter', (event) => {
            event.target.style.backgroundColor = "red";
        })
        counter++;
    }
}

fillCanvas(numberOfTiles);

slider.addEventListener('input', () => {
    sliderValue.innerText = slider.value;
    sideLength = slider.value;
    numberOfTiles = sideLength**2;
    console.log(sideLength, numberOfTiles, container.childNodes.length);
    fillCanvas(numberOfTiles);
})