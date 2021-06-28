import React from 'react';
import Input from './Input';
import Select from './Select';

import PropTypes from 'prop-types';

export default function DiscProperties({ tag, availability, onChange, style }) {
  const { typedName, fontFamily, insideColor, outsideColor } = tag;

  const { fontsArray, insideColorArray, outsideColorArray } = availability;

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
          value={typedName}
          onChange={handleTypingName}
        />

        <Select
          array={fontsArray}
          label="Font Type:"
          value={fontFamily}
          onChange={handleSelectFont}
          applyFont
        />

        <Select
          array={insideColorArray}
          label="Inside Color:"
          value={insideColor}
          onChange={handleSelectInsideColor}
        />

        <Select
          array={outsideColorArray}
          label="Outside Color:"
          value={outsideColor}
          onChange={handleSelectOutsideColor}
        />
      </form>
    </div>
  );
}

DiscProperties.propTypes = {
  tag: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
