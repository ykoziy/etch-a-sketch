let penColor = "rainbow";
let isDrawing = false;

function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomRGBColor() {
    const randomR = getRandomNum(0, 255);
    const randomG = getRandomNum(0, 255);
    const randomB = getRandomNum(0, 255);
    return [randomR, randomG, randomB];
}

function rgbStringToArray(rgbString) {
    let result = rgbString.slice(4, -1).split(",").map(item => Number(item));
    return result;
}

function rgbArrayToString(rgbArray) {
    return `rgb(${rgbArray.join(',')})`;
}

function darkenRGB(rgbArray) {
    if (rgbArray[0] > 0) {
        return rgbArray.map(value => value -= 26);
    } else {
        return [0,0,0];
    }
}

function setPenColor() {
    penColor = this.dataset.color;
}

function toggleColorButton() {
    const btns = Array.from(document.querySelectorAll(".set-color"));
    btns.forEach(item => {
        if (item.classList.contains("active")) {
            item.classList.remove("active");
        }
    });
    this.classList.add("active");
    setPenColor.call(this);
}

function clearGrid() {
    let items = Array.from(document.querySelectorAll(".grid-item"));
    items.forEach(grid => {
        grid.style.backgroundColor = 'white';
        grid.classList.remove("shaded");
    });
}

function setGridSize() {

    let size = prompt("Please enter new size");
    if (size !== '') {
        let newSize = Number(size);
        if (newSize < 1 || newSize > 100 || isNaN(newSize)) {
            alert("Enter a valid input. Valid input range: 1 - 100");
            setGridSize();
        } else {
            const grid = document.querySelector(".container");
            grid.textContent = '';            
            generateGrid(newSize);
        }
    } else {
        alert("Enter a valid input. Valid input range: 1 - 100");
        setGridSize();
    }
}

function setDrawingState(e) {
    if (e.button == 0) {
        isDrawing = !isDrawing;
        changeGridColor.call(e.target);
    }
}

function changeGridColor() {
    if (penColor === "rainbow" && isDrawing) {
        const rgbArray = getRandomRGBColor();
        this.style.backgroundColor = rgbArrayToString(rgbArray);
        this.classList.remove("shaded");
    } else if (penColor === "black" && isDrawing) {
        this.style.backgroundColor = "rgb(0, 0, 0)";
        this.classList.remove("shaded");
    } else if (penColor === "shaded" && isDrawing) {
        if (!this.style.backgroundColor || !this.classList.contains("shaded")) {
            this.style.backgroundColor = "rgb(234, 234, 234)";
            this.classList.add("shaded")
        } else {
            let rgbArray = rgbStringToArray(this.style.backgroundColor);
            let newRgb = darkenRGB(rgbArray);
            this.style.backgroundColor = rgbArrayToString(newRgb);
        }   
    }
}

function createGridSqaure(size) {
    const grid = document.querySelector(".container");
    let gridItem = document.createElement("div");
    console.log(size);
    gridItem.style.width = `${size}px`;
    gridItem.style.height = `${size}px`;
    gridItem.classList.add("grid-item");
    gridItem.addEventListener("mouseover", changeGridColor);
    grid.appendChild(gridItem);
}

function createBreak() {
    const grid = document.querySelector(".container");
    let breakItem = document.createElement("div");
    breakItem.classList.add("break");
    grid.appendChild(breakItem);
}

function generateGrid(size) {
    const width = document.querySelector(".container").getBoundingClientRect().width;
    for (let i = 0; i < size; i++) {   
        for (let j = 0; j < size; j++) {
            createGridSqaure(width / size);
        }
        createBreak();
    }
}

generateGrid(16);

const container = document.querySelector(".container");
container.addEventListener("mousedown", setDrawingState)

const clearButton = document.querySelector(".clearBtn");
clearButton.addEventListener("click", clearGrid);

const setSizeButton = document.querySelector(".setSizeBtn");
setSizeButton.addEventListener("click", setGridSize);

const colorButtons = Array.from(document.querySelectorAll(".set-color"));
colorButtons.forEach(button => button.addEventListener("click", toggleColorButton));

