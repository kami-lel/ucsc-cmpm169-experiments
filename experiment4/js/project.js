var bufferRed;
var bufferGreen;
var bufferBlue;

function setUpBufferRed(preProcessImage) {
  bufferRed = createGraphics(preProcessImage.width, preProcessImage.height);
  bufferRed.image(preProcessImage, 0, 0);

  // load the pixel data of the image into buffer1
  bufferRed.loadPixels();

  for (let y = 0; y < bufferRed.height; y++) {
    for (let x = 0; x < bufferRed.width; x++) {
      let index = (x + y * bufferRed.width) * 4;

      // extract the red component from the image's pixels
      let r = bufferRed.pixels[index];

      // set only the red component in the new image, other components are zero
      bufferRed.pixels[index] = r; // red
      bufferRed.pixels[index + 1] = 0; // green
      bufferRed.pixels[index + 2] = 0; // blue
      bufferRed.pixels[index + 3] = Math.floor(255 / 3);
    }
  }

  // update the buffer1 with modified pixels
  bufferRed.updatePixels();
}

function setupBufferGreen(preProcessImage) {
  bufferGreen = createGraphics(preProcessImage.width, preProcessImage.height);
  bufferGreen.image(preProcessImage, 0, 0);

  // load the pixel data of the image into buffer2
  bufferGreen.loadPixels();

  for (let y = 0; y < bufferGreen.height; y++) {
    for (let x = 0; x < bufferGreen.width; x++) {
      let index = (x + y * bufferGreen.width) * 4;

      // extract the green component from the image's pixels
      let g = bufferGreen.pixels[index + 1];

      // set only the green component in the new image, other components are zero
      bufferGreen.pixels[index] = 0; // red
      bufferGreen.pixels[index + 1] = g; // green
      bufferGreen.pixels[index + 2] = 0; // blue
      bufferGreen.pixels[index + 3] = Math.floor(255 / 3);
    }
  }

  // update the buffer2 with modified pixels
  bufferGreen.updatePixels();
}

function setupBufferBlue(preProcessImage) {
  bufferBlue = createGraphics(preProcessImage.width, preProcessImage.height);
  bufferBlue.image(preProcessImage, 0, 0);

  // load the pixel data of the image into buffer3
  bufferBlue.loadPixels();

  for (let y = 0; y < bufferBlue.height; y++) {
    for (let x = 0; x < bufferBlue.width; x++) {
      let index = (x + y * bufferBlue.width) * 4;

      // extract the blue component from the image's pixels
      let b = bufferBlue.pixels[index + 2];

      // set only the blue component in the new image, other components are zero
      bufferBlue.pixels[index] = 0; // red
      bufferBlue.pixels[index + 1] = 0; // green
      bufferBlue.pixels[index + 2] = b; // blue
      bufferBlue.pixels[index + 3] = Math.floor(255 / 3);
    }
  }

  // update the buffer3 with modified pixels
  bufferBlue.updatePixels();
}

class DistortionImage {
  constructor(preProcessImage, canvas) {
    preProcessImage = preProcessImage;

    let scaleFactor = Math.min(
      canvas.height / preProcessImage.height,
      canvas.width / preProcessImage.width
    );

    this.scaledWidth = Math.floor(preProcessImage.width * scaleFactor);
    this.scaledHeight = Math.floor(preProcessImage.height * scaleFactor);

    this.distortionAmount = 0;

    this.setupBuffer1();
    this.setupBuffer2();
    this.setupBuffer3();

    console.log(bufferRed, bufferGreen, bufferBlue); // HACK
  }

  update() {
    this.updateDistortionAmount();
    this.drawBuffer1();
    this.drawBuffer2();
    this.drawBuffer3();
  }

  updateDistortionAmount() {
    if (this.distortionAmount < 1) {
      this.distortionAmount += 0.5;
    }
  }

  drawBuffer1() {
    let xShift = 0;
    let yShift = 0;

    image(
      bufferRed,
      Math.floor(xShift),
      Math.floor(yShift),
      this.scaledWidth,
      this.scaledHeight
    );
  }

  drawBuffer2() {
    let xShift = this.distortionAmount * 40;
    let yShift = this.distortionAmount * 10;
    image(
      bufferGreen,
      Math.floor(xShift),
      Math.floor(yShift),
      this.scaledWidth,
      this.scaledHeight
    );
  }

  drawBuffer3() {
    let xShift = this.distortionAmount * 20;
    let yShift = this.distortionAmount * 15;
    image(
      bufferBlue,
      Math.floor(xShift),
      Math.floor(yShift),
      this.scaledWidth,
      this.scaledHeight
    );
  }
}
