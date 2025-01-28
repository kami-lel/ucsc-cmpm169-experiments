// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js


const PARTICLE_CNT = 200;
const BG_COLOR ='rgba(255, 255, 255, 255)' ;
const BOX_SIZE = 300;

// an array to add multiple particles
let particles = [];
var box;
var prebox;

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


  for(let i = 0; i<PARTICLE_CNT ;i++){
    particles.push(new Particle());
  }

  box = new Box(width / 2, height/2, BOX_SIZE);
  prebox = new Box(box.centerX - BOX_SIZE, box.centerY, BOX_SIZE);
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  background(BG_COLOR);
  box.drawBox();
  for(let i = 0;i<particles.length;i++) {
    particles[i].drawParticle();
    if (isPointInBox(prebox, particles[i].x, particles[i].y)) {
      particles[i].calcCollision();
    } else {
      particles[i].ySpeed = random(-1, 1);
    }
    particles[i].moveParticle();
  }
}





// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // code to run when mouse is pressed
}