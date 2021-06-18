import React from 'react';
import { Modal } from 'react-responsive-modal';
import { useKeypress } from '../helpers/use-keypress';

import Input from './Input';

import PropTypes from 'prop-types';

export default function Select({
  array,
  value = '',
  onChange,
  label,
  applyFont,
  applyColor,
}) {
  const [showModal, setShowModal] = React.useState({ state: false, index: -1 });

  const [input, setInput] = React.useState(value);

  const myRef = React.useRef(null);

  const handleSelect = (value, description) => {
    onChange(value);
    setInput(description);
  };

  const handleSelectChange = (type) => {
    switch (type) {
      case '+':
        setShowModal((prev) => {
          const { index } = prev;
          if (index === -1) return { ...prev, index: array.length - 1 };
          return { ...prev, index: index - 1 };
        });
        break;

      case '-':
        setShowModal((prev) => {
          const { index } = prev;
          if (index === array.length - 1) return { ...prev, index: -1 };
          return { ...prev, index: index + 1 };
        });
        break;
      default:
        throw new Error();
    }
  };

  React.useEffect(() => {
    function onKeyup(e) {
      if (showModal.state) {
        switch (e.key) {
          case 'Enter':
            if (showModal.index !== -1) {
              handleSelect(
                array[showModal.index].value,
                array[showModal.index].description
              );
            } else {
              handleSelect('', '');
            }
            setShowModal(false);
            break;
          case 'ArrowDown':
            handleSelectChange('-');
            break;
          case 'ArrowUp':
            handleSelectChange('+');
            break;
          default:
            break;
        }
      }
    }
    window.addEventListener('keyup', onKeyup);
    return () => window.removeEventListener('keyup', onKeyup);
  }, [showModal]);

  return (
    <div ref={myRef} style={{ position: 'relative' }}>
      <Input
        type="text"
        label={label}
        value={input}
        onChange={(newValue) => {
          setInput(newValue);
        }}
        onFocus={() => {
          setShowModal({ state: true, index: -1 });
        }}
        onBlur={() => setShowModal({ state: false })}
        readOnly
      />
      <Modal
        open={showModal.state}
        onClose={() => setShowModal({ state: false })}
        showCloseIcon={false}
        container={myRef.current}
        styles={{
          root: {
            position: 'absolute',
            top: '-10px',
            left: '-10px',
            width: 'calc(100% + 20px)',
            margin: '0px',
            height: '50vh',
          },
          modal: {
            margin: '10px',
            width: '95%',
            padding: '0px',
            fontSize: 'calc(10px + 1vmin)',
            color: '#37474f',
            fontFamily: 'Asap',
            fontWeight: '500',
            boxShadow: '0px 0px transparent',
            border: '1px solid #DCDCDC',
          },
          overlay: {
            background: 'transparent',
          },
        }}
      >
        <>
          <div
            style={{
              padding: '15px',
              color: 'white',
              border: `${showModal.index === -1 ? '1px solid #37474f' : ''}`,
            }}
            onClick={() => setInput('')}
          ></div>
          {array.map((element, index) => {
            return (
              <div
                key={index}
                style={{
                  padding: '10px',
                  background: `${index % 2 === 0 ? '#DCDCDC' : 'white'}`,
                  fontFamily: `${applyFont ? element.value : 'inherit'}`,
                  color: `${applyColor ? element.value : 'inherit'}`,
                  border: `${
                    index === showModal.index ? '1px solid #37474f' : ''
                  }`,
                }}
                onClick={() => handleSelect(element.value, element.description)}
              >
                {element.description}
              </div>
            );
          })}
        </>
      </Modal>
    </div>
  );
}

Select.propTypes = {
  array: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
};
