// Get the onscreen canvas element and attach another offscreen canvas element to it
let canvas = document.getElementById("onscreen");
canvas.width = 800;
canvas.height = 600;
canvas.offscreenCanvas = document.createElement('canvas');
canvas.offscreenCanvas.width = canvas.width;
canvas.offscreenCanvas.height = canvas.height;

// Create context for the two canvases - one offscreen, and other onscreen
let c = canvas.getContext("2d");
let g = canvas.offscreenCanvas.getContext("2d");

// Set the font settings for numbering the vertices of the regular polygon
c.fillStyle = "rgb(255, 255, 255)";
let fontArgs = c.font.split(' ');
let newSize = '16px';
c.font = newSize + ' ' + fontArgs[fontArgs.length - 1];

// Get the DOM elements for the parameters and the button
let sideCount     = document.querySelector("#sideCount");
let rank          = document.querySelector("#rank");
let radius        = document.querySelector("#radius");
let speed         = document.querySelector("#speed");
let animateButton = document.querySelector(".go-btn");

// Add a "click" event listener to the button
animateButton.addEventListener("click", function () {
    init();
});

let spindle;

function init() {
    // Whenever init is called, spindle is redeclared using values from the DOM parameters
    let n = Number(sideCount.value);
    let k = Number(rank.value);
    let r = Number(radius.value);
    let maxSpeed = Number(speed.value);
    spindle = new Spindle(n, k, r, maxSpeed);

    // Clear the offscreen canvas and make it ready to draw spiral traces
    g.clearRect(0, 0, canvas.offscreenCanvas.width, canvas.offscreenCanvas.height);
}

function draw() {
    spindle.update();
    spindle.display();
    requestAnimationFrame(draw);
}

init();
draw();
