//-------------------------------------------
// ELEMENTS ON THE SCREEN WE WANT TO CHANGE
//-------------------------------------------
const etchasketch = document.querySelector(".etchasketch");
const gridButton = document.querySelector("#size-grid");
const shadesButton = document.querySelector("#shade");
const resetButton = document.querySelector("#reset");
const swatches = document.querySelectorAll(".swatch");
let squares = document.querySelectorAll(".square");

//-------------------------------------------
// RESET THE GRID TO NO BACKGROUND COLOR
//-------------------------------------------
function reset() {
    squares = document.querySelectorAll(".square");
    squares.forEach((square) => square.style.backgroundColor = '');
}
resetButton.addEventListener("click", reset);

//-------------------------------------------
// CHANGE GRID SIZE
//-------------------------------------------
function promptGridSize() {
    newGridSize = prompt("What grid size do you want?");
    if (newGridSize > 100 || newGridSize < 0) {
        alert("Grid size is not accurate. Choose a number below 100 and above 0");
        return;
    }
    resizeGrid(newGridSize);   
}

gridButton.addEventListener("click", promptGridSize);

function resizeGrid(gridSize) {
    etchasketch.innerHTML = '';
    for (let i=0; i<(gridSize*gridSize); i++) {
        const square = document.createElement("div");
        square.id = `square${i}`;
        square.className = 'square';
        square.style.width = `${(etchasketch.offsetWidth - 2) / gridSize}px`;
        square.style.height = square.style.width;
        etchasketch.appendChild(square);
    }; 
    createTileEventListeners(); 
}

resizeGrid(16);

//-------------------------------------------
// DEAL WITH OPACITY AND COLORS
//-------------------------------------------

// create the swatch colors 
const retro1 = ['rgb(251, 121, 102)', 'rgb(239, 126, 89)', 'rgb(107, 198, 192)', 'rgb(249, 202, 119)', 'rgb(118, 72, 56)'];
let currentColor = retro1[0];
let includeOpacity = false;
swatches.forEach((swatch, i) => {
    if (i==5) {
        swatch.style.backgroundImage = `linear-gradient(to right, ${retro1[0]}, ${retro1[1]}, ${retro1[2]}, ${retro1[3]}, ${retro1[4]})`;
    } else {
        swatch.style.backgroundColor = retro1[i];
    }

    // add an event listener which changes the hover color to the new color
    swatch.addEventListener("click", () => {
        currentColor = swatch.style.backgroundColor;
    })
});

shadesButton.addEventListener("click", () => {
    includeOpacity = !includeOpacity; 
    console.log(includeOpacity);
});


const RGBA_RE = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/;

const toRGBA = (color, a = 1) => {
    const m = color.match(RGBA_RE);
    if (!m) return color; 
    const [, r, g, b] = m;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function onEnter(e) {
  const el = e.currentTarget;

  if (!includeOpacity) {
    el.dataset.a = "";
    el.style.backgroundColor = toRGBA(currentColor, 1);
    return;
  }

  // shade in: start at 0.1, +0.1 each hover, cap at 1
  const prevA = parseFloat(el.dataset.a || "0");
  const nextA = Math.min(prevA === 0 ? 0.1 : prevA + 0.1, 1);
  el.dataset.a = nextA.toFixed(1);
  el.style.backgroundColor = toRGBA(currentColor, nextA);
}

function createTileEventListeners() {
  const squares = document.querySelectorAll(".square");
  squares.forEach(sq => {
    sq.removeEventListener("mouseenter", onEnter);
    sq.addEventListener("mouseenter", onEnter);
  });
}