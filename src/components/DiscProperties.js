import React from 'react';
import Input from './Input';
import Select from './Select';

import PropTypes from 'prop-types';
import styles from '../styles/styles';

export default function DiscProperties({ tag, availability, onChange, style }) {
  // const { typedName, fontFamily, insideColor, outsideColor } = tag;

  const { fontsArray, insideColorArray, outsideColorArray } = availability;
  // console.log(availability);

  const handleTypingName = (newName) => {
    onChange({ ...tag, typedName: newName });
  };

  const handleSelectFont = (newName) => {
    onChange({ ...tag, fontFamily: `${newName ? newName : 'serif'}` });
  };

  const handleSelectInsideColor = (newName) => {
    onChange({ ...tag, insideColor: `${newName ? newName : 'black'}` });
  };

  const handleSelectOutsideColor = (newName) => {
    onChange({ ...tag, outsideColor: `${newName ? newName : 'white'}` });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '70%',
        minWidth: '150px',
        maxWidth: '300px',
        ...style,
      }}
    >
      <form>
        <Input
          type="text"
          label={'Tag Name:'}
          value={tag.typedName}
          onChange={handleTypingName}
        />

        <Select
          array={fontsArray}
          onChange={handleSelectFont}
          label="Font Type:"
          applyFont
        />

        <Select
          array={insideColorArray}
          onChange={handleSelectInsideColor}
          label="Inside Color:"
        />

        <Select
          array={outsideColorArray}
          onChange={handleSelectOutsideColor}
          label="Outside Color:"
        />
      </form>
    </div>
  );
}

DiscProperties.propTypes = {
  tag: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
