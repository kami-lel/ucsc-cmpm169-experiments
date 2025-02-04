const MILLI_PER_FRAME = 2000;

class DistortionImage {
  constructor(preProcessImage, canvas, distortionSpeed) {
    this.preProcessImage = preProcessImage;

    let scaleFactor = Math.min(
      canvas.height / this.preProcessImage.height,
      canvas.width / this.preProcessImage.width
    );

    this.scaledWidth = Math.floor(this.preProcessImage.width * scaleFactor);
    this.scaledHeight = Math.floor(this.preProcessImage.height * scaleFactor);

    this.setUpBufferRed();
    this.setupBufferGreen();
    this.setupBufferBlue();

    this.distortionAmount = 0;
    this.distortionSpeed = distortionSpeed;
    this.distorted = false;
  }

  setUpBufferRed() {
    this.bufferRed = createGraphics(
      this.preProcessImage.width,
      this.preProcessImage.height
    );
    this.bufferRed.image(this.preProcessImage, 0, 0);

    // load the pixel data of the image into buffer1
    this.bufferRed.loadPixels();

    for (let y = 0; y < this.bufferRed.height; y++) {
      for (let x = 0; x < this.bufferRed.width; x++) {
        let index = (x + y * this.bufferRed.width) * 4;

        // extract the red component from the image's pixels
        let r = this.bufferRed.pixels[index];

        // set only the red component in the new image, other components are zero
        this.bufferRed.pixels[index] = r; // red
        this.bufferRed.pixels[index + 1] = 0; // green
        this.bufferRed.pixels[index + 2] = 0; // blue
      }
    }

    // update the buffer1 with modified pixels
    this.bufferRed.updatePixels();
  }

  setupBufferGreen() {
    this.bufferGreen = createGraphics(
      this.preProcessImage.width,
      this.preProcessImage.height
    );
    this.bufferGreen.image(this.preProcessImage, 0, 0);

    // load the pixel data of the image into buffer2
    this.bufferGreen.loadPixels();

    for (let y = 0; y < this.bufferGreen.height; y++) {
      for (let x = 0; x < this.bufferGreen.width; x++) {
        let index = (x + y * this.bufferGreen.width) * 4;

        // extract the green component from the image's pixels
        let g = this.bufferGreen.pixels[index + 1];

        // set only the green component in the new image, other components are zero
        this.bufferGreen.pixels[index] = 0; // red
        this.bufferGreen.pixels[index + 1] = g; // green
        this.bufferGreen.pixels[index + 2] = 0; // blue
      }
    }

    // update the buffer2 with modified pixels
    this.bufferGreen.updatePixels();
  }

  setupBufferBlue() {
    this.bufferBlue = createGraphics(
      this.preProcessImage.width,
      this.preProcessImage.height
    );
    this.bufferBlue.image(this.preProcessImage, 0, 0);

    // load the pixel data of the image into buffer3
    this.bufferBlue.loadPixels();

    for (let y = 0; y < this.bufferBlue.height; y++) {
      for (let x = 0; x < this.bufferBlue.width; x++) {
        let index = (x + y * this.bufferBlue.width) * 4;

        // extract the blue component from the image's pixels
        let b = this.bufferBlue.pixels[index + 2];

        // set only the blue component in the new image, other components are zero
        this.bufferBlue.pixels[index] = 0; // red
        this.bufferBlue.pixels[index + 1] = 0; // green
        this.bufferBlue.pixels[index + 2] = b; // blue
      }
    }

    // update the buffer3 with modified pixels
    this.bufferBlue.updatePixels();
  }

  update() {
    this.drawBuffer1();
    this.drawBuffer2();
    this.drawBuffer3();

    if (this.distorted && this.distortionAmount < 1) {
      this.distortionAmount += this.distortionSpeed;
    }
  }

  drawBuffer1() {
    // TODO random
    let xShift = 0;
    let yShift = 0;

    image(
      this.bufferRed,
      Math.floor(xShift),
      Math.floor(yShift),
      this.scaledWidth,
      this.scaledHeight
    );
  }

  drawBuffer2() {
    // TODO random
    let xShift = this.distortionAmount * 30;
    let yShift = this.distortionAmount * 6;
    image(
      this.bufferGreen,
      Math.floor(xShift),
      Math.floor(yShift),
      this.scaledWidth,
      this.scaledHeight
    );
  }

  drawBuffer3() {
    // TODO random
    let xShift = this.distortionAmount * 15;
    let yShift = this.distortionAmount * 12;
    image(
      this.bufferBlue,
      Math.floor(xShift),
      Math.floor(yShift),
      this.scaledWidth,
      this.scaledHeight
    );
  }
}

class ShakeExperience {
  constructor(preProcessImage, canvas) {
    this.preProcessImage = preProcessImage;
    this.canvas = canvas;

    this.init();
  }

  init() {
    this.glitchStartTime = millis(); // TODO

    this.distortionImage = new DistortionImage(
      this.preProcessImage,
      this.canvas,
      random(0.008, 0.018)
    );

    this.shakeCnt = 0;
    this.shakeTarget = floor(random(6));

    this.shakeAnimationStart = null;
  }

  update() {
    if (millis() > this.glitchStartTime) {
      this.distortionImage.distorted = true;
    }

    this.distortionImage.update();
  }

  shake() {
    if (this.distortionImage.distortionAmount >= 1) {
      this.shakeCnt += 1;

      if (this.shakeCnt >= this.shakeTarget) {
        this.init();
      }
    }
  }
}
