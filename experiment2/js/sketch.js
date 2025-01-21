// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
const BACKGROUND_COLOR = 255;

let canvasContainer;
var centerHorz, centerVert;


class Trident {
    constructor(x, y, length) {
        this.x = x;
        this.y = y;
        this.length = length;
    }

    draw() {
      line(this.x, this.y, this.x, this.y + this.length)
    }
}


function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

// setup() function is called once when the program starts
function setup() {
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  // resize canvas is the page is resized

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();

}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  // empty canvas
  background(BACKGROUND_COLOR);

  // set origin at center of screen
  translate(width / 2, height / 2);
  translate(centerHorz / 2, centerVert / 2);

  strokeWeight(20);
  line(0, 0, centerVert, centerHorz)

  // HACK
  // const trident = new Trident(centerHorz, centerVert, 0);
  // trident.draw();
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // code to run when mouse is pressed
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}