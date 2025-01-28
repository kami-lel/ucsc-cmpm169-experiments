
const MIN_XSPEED = 2;
const MAX_XSPEED = 15;

const RANGE_Y = 20;
const RANGE_X = 20;
const RANGE_SIZE = 20;


// this class describes the properties of a single particle.
class Particle {
// setting the co-ordinates, radius and the
// speed of a particle in both the co-ordinates axes.
  constructor(){
    this.init();
    this.x = random(0,width);
  }

  init() {
    this.x = 0
    this.y = random(0, height);
    this.xSpeed = random(MIN_XSPEED, MAX_XSPEED);
    this.ySpeed = 0
    this.tur = random(-0.05, 0.05);
  }


  drawParticle() {
    let rgbColor = hueToRGB(this.xSpeed);
    noStroke();
    fill(rgbColor);

    let size = map(this.xSpeed, MIN_XSPEED, MAX_XSPEED, 10, 4)

    circle(this.x,this.y, size);
  }

  calcCollision() {
    let dist = width /2 - this.x;

    this.ySpeed = random(5, Math.exp(dist/300));

    if (this.y < height / 2) {
      this.ySpeed *= -1;
    }

  }

  moveParticle() {
    this.ySpeed += this.tur;
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
      this.init();
    }
  }

}

function hueToRGB(xSpeed) {
    let r, g, b;
    let hue = map(xSpeed, MIN_XSPEED, MAX_XSPEED, 250, 360);

    let c = 255; // Full saturation
    let x = c * (1 - Math.abs((hue / 60) % 2 - 1));
    let m = 0;

    if (hue < 60) {
        r = c; g = x; b = m;
    } else if (hue < 120) {
        r = x; g = c; b = m;
    } else if (hue < 180) {
        r = m; g = c; b = x;
    } else if (hue < 240) {
        r = m; g = x; b = c;
    } else if (hue < 300) {
        r = x; g = m; b = c;
    } else {
        r = c; g = m; b = x;
    }

    let alpha = map(xSpeed, MIN_XSPEED, MAX_XSPEED, 20, 255)
    return color(r + m, g + m, b + m, alpha); // Convert to usable color
}

const CIRCLE_RADIUS = 50;



class Box {
    constructor(centerX, centerY, size) {
        this.centerX = centerX;
        this.centerY = centerY;
        this.size = size;
    }

    drawBox() {
        rectMode(CENTER);
        fill("rgba(0,0,0,255)");
        rect(this.centerX, this.centerY, this.size, this.size);
    }

}



// function to detect if the point is in the box
function isPointInBox(box, x, y) {
    const halfSize = box.size / 2;
    return (
        x >= box.centerX - halfSize &&
        x <= box.centerX + halfSize &&
        y >= box.centerY - halfSize &&
        y <= box.centerY + halfSize
    );
}