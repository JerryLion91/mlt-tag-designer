import React from 'react';
import Button from '../components/Button';
import Header from '../components/Header';
import Tag from '../components/Tag';
import { useHistory } from 'react-router-dom';
import AppBody from '../components/AppBody';
import Footer from '../components/Footer';
import Input from '../components/Input';
import SummaryTable from '../components/SummaryTable';

import styles from '../styles/styles';

import PropTypes from 'prop-types';

export default function TagSumaryPage({ order, changeOrder, standards }) {
  const history = useHistory();
  const { tag_std_price } = standards;

  const handleChange = (newQuantity, index) => {
    const newTag = {
      typedName: order.TAGs[index].typedName,
      fontFamily: order.TAGs[index].fontFamily,
      insideColor: order.TAGs[index].insideColor,
      outsideColor: order.TAGs[index].outsideColor,
      quantity: newQuantity,
    };
    changeOrder({ type: 'changeTag', index: index, tag: newTag });
  };

  const handleDelete = (index) => {
    changeOrder({ type: 'removeTag', index: index });
  };

  return (
    <>
      <Header subtitle="Designed Tags">
        <Button onClick={() => history.push('/')} icon={'home'} />
        <Button
          onClick={() => history.push('/tag-constructor')}
          icon={'navigate_before'}
        />
      </Header>
      <AppBody>
        {order.TAGs.map((tag, index) => {
          const {
            typedName,
            fontFamily,
            insideColor,
            outsideColor,
            quantity,
          } = tag;
          return (
            <div
              key={index}
              style={{
                ...styles.divFlexRow,
                ...styles.cardParent,
              }}
            >
              <Tag size={90} tag={tag} spaceBetween={0} startPosition={0} />
              <div style={styles.card}>
                <span style={{ marginTop: '10px' }}>
                  Tag Name:{' '}
                  <span style={{ color: '#25292b' }}>{typedName}</span>
                </span>
                <span style={{ marginTop: '10px' }}>
                  Font Type:{' '}
                  <span style={{ color: '#25292b' }}>{fontFamily}</span>
                </span>
                <span style={{ marginTop: '10px' }}>
                  Colors:{' '}
                  <span style={{ color: '#25292b' }}>
                    {insideColor + ' & ' + outsideColor}
                  </span>
                </span>
              </div>
              <div>
                <Input
                  width={
                    quantity.length === 1
                      ? 35
                      : quantity.length === 2
                      ? 42
                      : quantity.length === 3
                      ? 50
                      : 65
                  }
                  label={'Qtd'}
                  type={'number'}
                  value={quantity}
                  onChange={(newNumber) => handleChange(newNumber, index)}
                />
                <Button
                  onClick={() => handleDelete(index)}
                  icon={'delete_forever'}
                  style={{ color: '#882aa2' }}
                />
              </div>
            </div>
          );
        })}
        <SummaryTable TAGs={order.TAGs} tag_std_price={tag_std_price} />
        <div style={styles.divFlexRow}>
          <Button
            style={{ ...styles.btnFilledPurple, margin: '0px 10px 0px 0px' }}
            onClick={() => history.push('/tag-constructor')}
          >
            Design Another
          </Button>
          <Button
            style={{ ...styles.btnFilledPurple, margin: '0px 0px 0px 10px' }}
            onClick={() => history.push('/tag-constructor/shipping')}
          >
            Purchase
          </Button>
        </div>
      </AppBody>
      <Footer />
    </>
  );
}
