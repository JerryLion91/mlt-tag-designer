import React from 'react';
import AppBody from '../components/AppBody';
import Button from '../components/Button';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SettingsButton from '../components/SettingsButton';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../helpers/use-auth';
import Tag from '../components/Tag';
import Status from '../components/Status';

import styles from '../styles/styles';

export default function OrdersPage() {
  const auth = useAuth();
  let location = useLocation();
  let history = useHistory();
  let { from } = location.state || { from: '/' };

  const orders = [
    {
      tags: [
        {
          typedName: 'Jeremias',
          fontFamily: 'serif',
          insideColor: 'any',
          outsideColor: 'any',
          quantity: 10,
        },
      ],
      orderStatus: 'Submited',
    },
    {
      tags: [
        {
          typedName: 'Leonardo',
          fontFamily: 'arial',
          insideColor: 'blue',
          outsideColor: 'grey',
          quantity: 8,
        },
      ],
      orderStatus: 'Processed',
    },
    {
      tags: [
        {
          typedName: 'Lucas',
          fontFamily: 'monospace',
          insideColor: 'any',
          outsideColor: 'any',
          quantity: 12,
        },
      ],
      orderStatus: 'Delivered',
    },
    {
      tags: [
        {
          typedName: 'Francis',
          fontFamily: 'serif',
          insideColor: 'any',
          outsideColor: 'any',
          quantity: 40,
        },
        {
          typedName: 'A Francis',
          fontFamily: 'serif',
          insideColor: 'any',
          outsideColor: 'any',
          quantity: 25,
        },
      ],
      orderStatus: 'Received',
    },
  ];

  return (
    <>
      <Header subtitle="My Orders">
        <SettingsButton />
        <Button onClick={() => history.push(from)} icon={'navigate_before'} />
      </Header>
      <AppBody>
        {orders.map((order, index) => {
          return (
            <div key={index} style={styles.cardParent}>
              <div>
                {order.tags.map((tag, index) => {
                  const { typedName, quantity } = tag;
                  return (
                    <div key={index} style={styles.divFlexRow}>
                      <Tag tag={tag} size={60} spaceBetween={0} />
                      <div style={{ ...styles.card, flexDirection: 'row' }}>
                        <span style={{ margin: '12px' }}>
                          Tag Name:{' '}
                          <span style={{ color: '#25292b' }}>{typedName}</span>
                        </span>
                        <span style={{ margin: '12px' }}>
                          Quantity:{' '}
                          <span style={{ color: '#25292b' }}>{quantity}</span>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <Status status={order.orderStatus} />
              <div
                style={{ ...styles.divFlexRow, fontSize: 'calc(6px + 1vmin)' }}
              >
                <Button
                  icon={'call'}
                  style={styles.btnUnfilledGray}
                  onClick={() => alert('dispach support email')}
                >
                  Call suport in this order
                </Button>
                <Button
                  icon={'delete'}
                  style={styles.btnUnfilledGray}
                  onClick={() => alert('dispach support email')}
                >
                  Delete this order
                </Button>
              </div>
            </div>
          );
        })}
      </AppBody>
      <Footer defaultButtons />
    </>
  );
}
