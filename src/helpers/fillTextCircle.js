import { isColor } from './colorChecker';

/**
 * @param {string} text - The name provided from input
 * @param {number} x - x position in the canvas
 * @param {number} y - y position in the canvas
 * @param {number} radius - circle radius
 * @param {number} startRotation - startRotations in degrees
 * @param {number} minSpacing
 * @returns {number} rotationDone in degress
 */
CanvasRenderingContext2D.prototype.fillTextCircle = function (
  text,
  x,
  y,
  radius,
  startRotation,
  minSpacing,
  insideColor,
  outsideColor
) {
  // (π = perímetro / diâmetro)

  let fontColor = 'black';
  if (isColor(insideColor)) {
    fontColor = insideColor;
  }
  let tagColor = 'white';
  if (isColor(outsideColor)) {
    tagColor = outsideColor;
  }

  // move the origin to the canvas center
  this.translate(x, y);

  this.beginPath();

  // rotate to match the startRotation
  this.rotate(degreesInRadians(startRotation + 90));

  /**
   * reference drawing:
   */
  this.arc(0, 0, radius * 2, 0, 2 * Math.PI);
  this.arc(0, 0, radius / 2, 0, degreesInRadians(30), true);
  this.arc(0, 0, radius / 2, 0, degreesInRadians(360));
  this.fillStyle = tagColor;
  this.fill();
  this.closePath();

  this.beginPath();
  this.fillStyle = 'white';
  this.arc(0, 0, radius / 2, 0, degreesInRadians(360));
  this.fill();
  this.closePath();

  this.beginPath();
  this.lineWidth = radius / 10;
  this.arc(0, 0, radius / 2, 0, degreesInRadians(360));
  this.arc(0, 0, radius / 2, 0, degreesInRadians(30), true);
  this.arc(0, 0, radius * 2, 0, 2 * Math.PI);
  this.stroke();
  this.closePath();

  this.rotate(degreesInRadians(-100));

  const letters = Array(text.length);

  // calculate the rotation for every letter in the provided text
  for (let i = 0; i < text.length; i++) {
    // measure character width
    const charWidth = this.measureText(text[i]).width;
    letters[i] = {
      width: charWidth,
      rads: radiansForLetters(charWidth, radius),
    };
  }
  // calculate the minimal radians rotation for the name
  const minimalRads = letters.reduce((acc, { rads }) => {
    return acc + rads;
  }, 0);

  // calculate the aditional space
  let aditionalSpace = 0;
  const radLimit = 5.7;
  const spaceAvailable = radLimit - minimalRads;
  if (text) {
    // Calculation to add space when available
    aditionalSpace = (spaceAvailable / text.length) * (text.length / 12);
  }

  let rotationDone = 0;
  // interact whith each character in the name provided from input and print
  for (let i = 0; i < text.length; i++) {
    const radiansToRotate =
      letters[i].rads +
      (aditionalSpace < minSpacing ? minSpacing : aditionalSpace);

    // rotate half actual char width
    this.rotate(radiansToRotate * -0.5);
    // print character centered in the x axis and moved radius value in the y axis
    this.fillStyle = fontColor;
    this.fillText(text[i], (letters[i].width * -1) / 2, radius * 1.6);
    // rotate another half
    this.rotate(radiansToRotate * -0.5);
    rotationDone += radiansToRotate;
  }
  return (rotationDone * 180) / Math.PI;
};

/**
 * 6,2831853071640004771 rad = 360 deg
 * @param {number} degree
 */
const degreesInRadians = (degree) => (degree * Math.PI) / 180;

/**
 * seno a = cateto oposto/hipotenusa
 * @param {number} charWidth
 * @param {number} radius
 * @returns {number} radiansToRotate
 */
const radiansForLetters = (charWidth, radius) => {
  const letterSpacing = Math.asin((charWidth * 0.5) / radius) * 2;
  return letterSpacing * 0.75;
};
