// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

var defaultImage;
var shakeExperience;

// Globals
let canvasContainer;
var centerHorz, centerVert;

let shape;

function preload() {
  defaultImage = loadImage(
    "https://upload.wikimedia.org/wikipedia/en/6/64/Windows_XP_Luna.png"
  );
}

// setup() function is called once when the program starts
function setup() {
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");

  let canvas = createCanvas(
    canvasContainer.width(),
    canvasContainer.height(),
    WEBGL
  );
  canvas.parent("canvas-container");
  // resize canvas is the page is resized

  ortho();

  // TODO
  $(window).resize(function () {
    resizeScreen();
  });
  resizeScreen();
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  clear();
  background("rgb(0, 0, 0)");

  // Enable orbiting with the mouse.
  orbitControl();

  // Draw the p5.Geometry object.
  model(buildGeometry(crateShape));
}

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

function crateShape() {
  cone();
}
