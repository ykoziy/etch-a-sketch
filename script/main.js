console.log('Script is working...');

function createGridSqaure() {
    const container = document.querySelector(".container");
    let gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");
    container.appendChild(gridItem);
}

function generateGrid(width, height) {
    for (let i = 0; i <= width; i++) {
        createGridSqaure();
    }
}

generateGrid(16, 16);