import React, { useEffect, useRef } from 'react';
import '../helpers/fillTextCircle.js';

import PropTypes from 'prop-types';

/**
 * the getPixelRatio produce a error in IOS
 */
// const getPixelRatio = (context) => {
//   var backingStore =
//     context.backingStorePixelRatio ||
//     context.webkitBackingStorePixelRatio ||
//     context.mozBackingStorePixelRatio ||
//     context.msBackingStorePixelRatio ||
//     context.oBackingStorePixelRatio ||
//     context.backingStorePixelRatio ||
//     1;
//   return (window.devicePixelRatio || 1) / backingStore;
// };

const FONTS = {
  serif: {
    spaceBetween: 0.07,
    sizeFactor: 1.1,
    bold: true,
  },
  arial: {
    spaceBetween: 0.07,
    sizeFactor: 1,
    bold: true,
  },
  monospace: {
    spaceBetween: 0.06,
    sizeFactor: 1,
    bold: true,
  },
  Chicle: {
    spaceBetween: 0.16,
    sizeFactor: 1.1,
    bold: true,
  },
  'Fredoka One': {
    spaceBetween: 0.05,
    sizeFactor: 1,
    bold: false,
  },
  Lemon: {
    spaceBetween: 0.05,
    sizeFactor: 0.85,
    bold: false,
  },
  Salsa: {
    spaceBetween: 0.08,
    sizeFactor: 1,
    bold: true,
  },
};

export default function Tag(props) {
  const { typedName, fontFamily, insideColor, outsideColor } = props.tag;
  const { size, styles } = props;

  let spaceBetween = FONTS[fontFamily].spaceBetween;
  let startPosition = 150;

  if (props.startPosition) {
    startPosition = props.startPosition;
  }

  const ref = useRef();

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');

    // set width and height
    // const ratio = getPixelRatio(ctx);
    // fixe the ratio to 1 to fix a bug in IOS
    const ratio = 1;
    const width = getComputedStyle(canvas)
      .getPropertyValue('width')
      .slice(0, -2);
    const height = getComputedStyle(canvas)
      .getPropertyValue('height')
      .slice(0, -2);
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // setting params
    const radius = size * 0.2;
    const fontSize = size * 0.2 * FONTS[fontFamily].sizeFactor;

    ctx.font = `${
      FONTS[fontFamily].bold ? 'bold' : ''
    } ${fontSize}px ${fontFamily}`;

    ctx.save();

    const rotationDone = ctx.fillTextCircle(
      typedName,
      width / 2,
      height / 2,
      radius,
      startPosition,
      parseFloat(spaceBetween),
      insideColor,
      outsideColor
    );

    if (rotationDone > 330) {
      ctx.restore();
      ctx.moveTo(0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.font = `bold ${fontSize / 2}px ${fontFamily}`;
      ctx.fillText('Tag name', size / 5.5, size / 2.3);
      ctx.fillText('too large', size / 5, size / 1.5);
    }
    // log dataURL =>
    // const dataURL = canvas.toDataURL();
    // console.log(`${dataURL}`);
    // log imageData =>
    // const imageData = ctx.getImageData(0, 0, 200, 200);
    // console.log(JSON.stringify(imageData));
  });

  // JSX canvas Element with the '2d' draw
  return (
    <canvas
      ref={ref}
      style={{ ...styles, width: `${size}px`, height: `${size}px` }}
    />
  );
}

Tag.propTypes = {
  tag: PropTypes.object.isRequired,
  size: PropTypes.number.isRequired,
  startPosition: PropTypes.number,
};
