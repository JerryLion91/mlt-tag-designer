import React from 'react';
import Button from '../components/Button';
import Header from '../components/Header';
import Tag from '../components/Tag';
import { useHistory } from 'react-router-dom';
import AppBody from '../components/AppBody';
import Footer from '../components/Footer';
import Input from '../components/Input';
import SummaryTable from '../components/SummaryTable';
import { useCookies } from 'react-cookie';

import styles from '../styles/styles';

import PropTypes from 'prop-types';

export default function TagSumaryPage({ availability, order, changeOrder }) {
  const history = useHistory();

  const { tag_std_price } = availability.tagPrices;

  const handleChange = (newQuantity, index) => {
    const newTag = {
      typedName: order.tags[index].typedName,
      fontFamily: order.tags[index].fontFamily,
      insideColor: order.tags[index].insideColor,
      outsideColor: order.tags[index].outsideColor,
      quantity: newQuantity,
    };
    changeOrder({ type: 'changeTag', index: index, tag: newTag });
  };

  const handleDelete = (index) => {
    changeOrder({ type: 'removeTag', index: index });
  };

  const [cookies, setCookie, removeCookie] = useCookies(['tag', 'order']);
  React.useEffect(() => {
    const { order } = cookies;
    if (order) {
      console.log(order);
    }
  }, [cookies]);
  const handleDesignAnother = () => {
    removeCookie('tag', { path: '/tag-constructor' });
    history.push('/tag-constructor');
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
        {order.tags.map((tag, index) => {
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
        <SummaryTable TAGs={order.tags} tag_std_price={tag_std_price} />
        <div style={styles.divFlexRow}>
          <Button
            style={{ ...styles.btnFilledPurple, margin: '0px 10px 0px 0px' }}
            onClick={handleDesignAnother}
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
