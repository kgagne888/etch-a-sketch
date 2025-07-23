const container = document.querySelector(".container");
const gridButton = document.querySelector("#size-grid");

function resizeGrid(gridSize) {
    container.innerHTML = '';
    for (let i=0; i<(gridSize*gridSize); i++) {
        const square = document.createElement("div");
        square.id = `square${i}`;
        square.className = 'square';
        square.style.width = `${(container.offsetWidth - 2) / gridSize}px`;
        square.style.height = square.style.width;
        container.appendChild(square);
        square.addEventListener("mouseenter", () => {
            square.classList.add('hovered-square');
        })
    }
}

// 16 is used as the initial
resizeGrid(16);

function promptGridSize() {
    newGridSize = prompt("What grid size do you want?");
    if (newGridSize > 100 || newGridSize < 0) {
        alert("Grid size is not accurate. Choose a number below 100 and above 0");
        return;
    }
    resizeGrid(newGridSize);   
}

gridButton.addEventListener("click", promptGridSize);



