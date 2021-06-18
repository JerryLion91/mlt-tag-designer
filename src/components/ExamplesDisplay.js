import React from 'react';

export default function ExamplesDisplay() {
  const IMGs = [
    {
      description: "It's a simple plastic tag",
      src: 'ExampleTag.jpg',
      alt: 'example',
    },
    {
      description: 'With this solution, never miss who own it',
      src: 'ExampleTag3.jpg',
      alt: 'example',
    },
  ];
  return (
    <div style={styles.divFlexColumn}>
      {IMGs.map((img, index) => {
        return (
          <div key={index} style={{ margin: '20px' }}>
            <label>
              <img
                style={{
                  margin: 'auto',
                  borderRadius: '5px',
                  width: '60vw',
                  maxWidth: '275px',
                }}
                src={img.src}
                alt={img.alt}
              />
              {img.description}
            </label>
          </div>
        );
      })}
    </div>
  );
}

const styles = {
  divFlexColumn: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    color: '#520369',
    fontWeight: '500',
    width: '60vw',
    maxWidth: '280px',
    margin: '70px',
  },
};
