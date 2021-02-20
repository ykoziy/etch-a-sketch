
function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomRGBColor() {
    const randomR = getRandomNum(0, 255);
    const randomG = getRandomNum(0, 255);
    const randomB = getRandomNum(0, 255);
    return [randomR, randomG, randomB];
}

function clearGrid() {
    let items = document.querySelectorAll(".grid-item");
    items.forEach(grid => grid.removeAttribute("style"));
}

function changeGridColor() {
    const rgbArray = getRandomRGBColor();
    this.style.backgroundColor = `rgb(${rgbArray[0]}, ${rgbArray[1]}, ${rgbArray[2]})`;
}

function createGridSqaure() {
    const container = document.querySelector(".container");
    let gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");
    gridItem.addEventListener("mouseover", changeGridColor);
    container.appendChild(gridItem);
}

function createBreak() {
    const container = document.querySelector(".container");
    let breakItem = document.createElement("div");
    breakItem.classList.add("break");
    container.appendChild(breakItem);
}

function generateGrid(width, height) {
    for (let i = 0; i < height; i++) {   
        for (let j = 0; j < width; j++) {
            createGridSqaure();
        }
        createBreak();
    }
}

generateGrid(16, 16);

let colorMode = "Rainbow"

const clearButton = document.querySelector(".clearBtn");
clearButton.addEventListener("click", clearGrid);