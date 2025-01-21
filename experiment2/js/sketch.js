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

var trident_offset_x;
var trident_offset_y;

const SQRT3 = Math.sqrt(3);


class Trident {
    constructor(x, y, length) {
        this.x = x;
        this.y = y;
        this.length = length;
    }

    draw() {
      // draw center to up
      line(this.x, this.y, this.x, this.y - this.length);
  
      // draw bottom left
      line(this.x, this.y, this.x - trident_offset_x, this.y + trident_offset_y);
  
      // draw bottom right
      line(this.x, this.y, this.x + trident_offset_x, this.y + trident_offset_y);
    }
}


function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...", centerHorz, centerVert);
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

  // TODO make interesting
  strokeWeight(10);

  const length = Math.max(mouseY / 5, 0) + 25;

  // calculate how many loops is neccessary
  const cnt_horz = Math.ceil(width / length) / 3;
  const cnt_vert = Math.ceil(height / length) / 6;

  trident_offset_y = length / 2;
  trident_offset_x = trident_offset_y * SQRT3;
  for (let i = -cnt_horz; i <= cnt_horz; i++) {
    for (let j = -cnt_vert; j <= cnt_vert; j++) {

      // draw 1st triden
      const x1 = i * 2 * trident_offset_x;
      const y1 = j * 6 * trident_offset_y;
      (new Trident(x1, y1, length)).draw();
  
      // draw 2nd triden
      const x2 = x1 + trident_offset_x;
      const y2 = y1 + length + trident_offset_y;
      (new Trident(x2, y2, length)).draw();
    }
  }
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // code to run when mouse is pressed
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}