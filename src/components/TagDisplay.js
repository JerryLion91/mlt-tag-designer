import React, { Fragment } from 'react';
import Button from './Button';
import '../styles/slider.css';

export default function TagDisplay({
  TAGS = [
    {
      description: 'Tag blue and yellow',
      src: 'Noah_BlueYellow.png',
    },
    {
      description: 'Tag red and white',
      src: 'Noah_RedWhite.png',
    },
    {
      description: 'Tag yellow and black',
      src: 'Noah_YellowBlack.png',
    },
  ],
}) {
  const handleImageChange = (state, action) => {
    const maxIndex = state.array.length - 1;
    switch (action.type) {
      case 'Left':
        return {
          ...state,
          preImg: state.nexImg === maxIndex ? 0 : state.nexImg + 1,
          curImg: state.curImg === maxIndex ? 0 : state.curImg + 1,
          nexImg: state.preImg === maxIndex ? 0 : state.preImg + 1,
          change: 'Left',
        };
      case 'Right':
        return {
          ...state,
          preImg: state.preImg === 0 ? maxIndex : state.preImg - 1,
          curImg: state.curImg === 0 ? maxIndex : state.curImg - 1,
          nexImg: state.nexImg === 0 ? maxIndex : state.nexImg - 1,
          change: 'Right',
        };
      default:
        throw new Error();
    }
  };

  const [slides, dispatch] = React.useReducer(handleImageChange, {
    array: TAGS,
    preImg: 0,
    curImg: 1,
    nexImg: 2,
    change: null,
  });

  // prevent to work with TAGS no array
  if (!Array.isArray(TAGS) || TAGS.length <= 0) {
    return null;
  }

  const nextImage = () => {
    dispatch({ type: 'Right' });
  };
  const prevImage = () => {
    dispatch({ type: 'Left' });
  };

  return (
    <div style={styles.slider}>
      <Button
        className="left-arrow"
        style={{ zIndex: 10 }}
        onClick={prevImage}
        icon={'keyboard_arrow_left'}
        text={''}
      />
      {slides.array.map((slide, index) => {
        return (
          <Fragment key={index}>
            {slides.change && (
              <div
                style={{ position: 'absolute' }}
                className={
                  index === slides.preImg && slides.change === 'Left'
                    ? `slide previous SlideFrom${slides.change}Out`
                    : 'slide'
                }
              >
                {index === slides.preImg && (
                  <img
                    style={styles.image}
                    src={slide.src}
                    alt={slide.description}
                  />
                )}
              </div>
            )}
            <div
              className={
                index === slides.curImg
                  ? `slide current SlideFrom${slides.change}In`
                  : 'slide'
              }
            >
              {index === slides.curImg && (
                <img
                  style={styles.image}
                  src={slide.src}
                  alt={slide.description}
                />
              )}
            </div>
            {slides.change && (
              <div
                style={{ position: 'absolute' }}
                className={
                  index === slides.nexImg
                    ? `slide next SlideFrom${slides.change}Out`
                    : 'slide'
                }
              >
                {index === slides.nexImg && (
                  <img
                    style={styles.image}
                    src={slide.src}
                    alt={slide.description}
                  />
                )}
              </div>
            )}
          </Fragment>
        );
      })}

      <Button
        style={{ zIndex: 10 }}
        onClick={nextImage}
        icon={'keyboard_arrow_right'}
        text={''}
      />
    </div>
  );
}

const styles = {
  slider: {
    margin: '20px',
    minWidth: '270px',
    maxWidth: '520px',
    width: '36vw',
    maxHeight: '280px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    margin: 'auto',
    width: '75vw',
    height: '60vw',
    maxWidth: '350px',
    maxHeight: '280px',
  },
};
