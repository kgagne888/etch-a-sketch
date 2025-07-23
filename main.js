const container = document.querySelector(".container");
// TODO: There has to be a better way to calculate this
container.style.width = `${16 * 20}px`;


// add 16x16 square divs to the container 
for (let i=0; i<(16*16); i++) {
    const square = document.createElement("div");
    square.id = `square${i}`;
    square.className = 'square';
    container.appendChild(square);
    square.addEventListener("mouseenter", () => {
        square.classList.add('hovered-square');
    })
}