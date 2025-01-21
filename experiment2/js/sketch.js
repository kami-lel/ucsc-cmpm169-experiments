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
var reference_width;
var another_seed = Math.floor(Math.random() * 10); // generates a random integer between 0 and 9


const SQRT3 = Math.sqrt(3);


function update_line_setting(i, j, trident_count, stroke_cnt) {

  var weight;
  var color;

  seed = (i * 31) + (j * 17) + (trident_count * 3) + (stroke_cnt * 7) + another_seed

switch (Math.abs(seed % 10)) {
  case 5:
      weight = 0.7;
      color = [150, 50, 50]; // brighter dark red
      break;
  case 2:
      weight = 0.9;
      color = [50, 150, 50]; // brighter dark green
      break;
  case 3:
      weight = 1.1;
      color = [50, 50, 150]; // brighter dark blue
      break;

    default:
        weight = 1;
        color = [0, 0, 0]; // black
}



  strokeWeight(reference_width * weight);
  stroke(color[0], color[1], color[2]);
}

class Trident {
    constructor(x, y, length) {
        this.x = x;
        this.y = y;
        this.length = length;
    }

    draw(i, j, trident_count) {
      // draw center to up
      update_line_setting(i, j, trident_count, 0);
      line(this.x, this.y, this.x, this.y - this.length);

      // draw bottom left
      update_line_setting(i, j, trident_count, 1);
      line(this.x, this.y, this.x - trident_offset_x, this.y + trident_offset_y);

      // draw bottom right
      update_line_setting(i, j, trident_count, 2);
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

  // link length w/ mouse Y position
  const length = Math.max(mouseY / 5, 0) + 30;

  reference_width = Math.max(mouseX * length / 1800, 1);

  // calculate how many loops is neccessary
  const cnt_horz = Math.ceil(width / length /3);
  const cnt_vert = Math.ceil(height / length / 6);

  trident_offset_y = length / 2;
  trident_offset_x = trident_offset_y * SQRT3;
  for (let i = -cnt_horz; i <= cnt_horz; i++) {
    for (let j = -cnt_vert; j <= cnt_vert; j++) {

      // draw 1st triden
      const x1 = i * 2 * trident_offset_x;
      const y1 = j * 6 * trident_offset_y;
      (new Trident(x1, y1, length)).draw(i, j, 0);

      // draw 2nd triden
      const x2 = x1 + trident_offset_x;
      const y2 = y1 + length + trident_offset_y;
      (new Trident(x2, y2, length)).draw(i, j, 1);
    }
  }
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // code to run when mouse is pressed
  another_seed = Math.floor(Math.random() * 10); // generates a random integer between 0 and 9
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}