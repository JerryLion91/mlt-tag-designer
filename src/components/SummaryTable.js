import React from 'react';

import PropTypes from 'prop-types';

import styles from '../styles/styles';

export default function SummaryTable({
  TAGs = [],
  tag_std_price,
  shipping_price,
}) {
  const totalTagsQuantity = TAGs.reduce((acc, tag) => {
    return acc + parseInt(tag.quantity) || 0;
  }, 0);

  const tagsPrice = (totalTagsQuantity * tag_std_price).toFixed(2);
  const calculatedTotalPrice = (
    parseFloat(tagsPrice) + (parseFloat(shipping_price) || 0)
  ).toFixed(2);

  return (
    <div style={styles.cardParent}>
      <div
        style={{
          width: '100%',
          textAlign: 'left',
          fontWeight: 'bold',
          marginLeft: '10px',
        }}
      >
        Summary
      </div>
      <div
        style={{
          margin: '5px 5%',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <span
          style={{
            width: '30%',
            color: '#37474f',
          }}
        >
          {totalTagsQuantity} Tags
        </span>
        <span
          style={{
            width: '20%',
          }}
        ></span>
        <span
          style={{
            width: '50%',
            textAlign: 'right',
            color: '#37474f',
          }}
        >
          {`${tagsPrice} `}&#163;
        </span>
      </div>
      {shipping_price !== undefined && (
        <div
          style={{
            margin: '5px 5%',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span
            style={{
              width: '30%',
              color: '#37474f',
            }}
          >
            Shipping:
          </span>

          {shipping_price === 0 ? (
            <span
              style={{
                width: '20%',
              }}
            >
              FREE
            </span>
          ) : (
            <span
              style={{
                width: '20%',
              }}
            ></span>
          )}
          <span
            style={{
              width: '50%',
              textAlign: 'right',
              color: '#37474f',
            }}
          >
            {`${shipping_price.toFixed(2)} `}&#163;
          </span>
        </div>
      )}
      <div
        style={{
          margin: '6px 5%',
          display: 'flex',
          justifyContent: 'space-between',
          borderTop: '2px solid #DCDCDC',
          paddingTop: '10px',
          marginTop: '8px',
        }}
      >
        <span
          style={{
            width: '25%',
            textAlign: 'left',
          }}
        >
          Total:
        </span>
        <span
          style={{
            width: '20%',
          }}
        ></span>
        <span
          style={{
            width: '50%',
            textAlign: 'right',
            color: '#37474f',
          }}
        >
          {`${calculatedTotalPrice} `}&#163;
        </span>
      </div>
    </div>
  );
}

SummaryTable.propTypes = {
  TAGs: PropTypes.array.isRequired,
  shippingPrice: PropTypes.number,
};
