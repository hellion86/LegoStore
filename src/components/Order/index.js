import React from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import Card from '../Card';
import { routes } from '../../routes';
import styles from './Order.module.scss';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const { t } = useTranslation();
  const notify = (msg) => toast.error(msg);

  const ordersTotal = (ord) =>
    ord
      .map((order) => order.items)
      .flat()
      .reduce((acc, item) => acc + item.price, 0);

  const orderPrice = (ord) => ord.reduce((acc, item) => acc + item.price, 0);

  React.useEffect(() => {
    const loadOrders = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(routes.orders);
        setOrders(data);
        setIsLoading(false);
      } catch (err) {
        notify(t('errors.orderLoad'));
      }
    };
    loadOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

 
  const removeOrder = async (id) => {
    try {
      setOrders(orders.filter((order) => order.id !== id));
      axios.delete(`${routes.orders}/${id}`);
      toast.warn(t('orderPage.orderConfirmRemove'), {
        icon: false
      });
    } catch (error) {
      notify(t('errors.orderLoad'));
    }
  };

  const renderItems = () => {
    if (isLoading) {
      return (
        <div className="d-flex">
          {[...Array(4)].map((ked, index) => (
            <Card key={index} keds={ked} loading={true} />
          ))}
        </div>
      );
    } else {
      return orders.map((order, index) => (
        <div key={index} className={styles.orderItem}>
          <div className="d-flex justify-between">
            <h3>
              {t('orderPage.orderNum')}
              {order.id} {t('orderPage.orderSumm')} {orderPrice(order.items)}{' '}
              {t('money')}
            </h3>
            <img
              onClick={() => removeOrder(order.id)}
              className={styles.removeBtn}
              src="/img/btn-remove.svg"
              alt={t('imgAlt.remove')}
            ></img>
          </div>
          <div className="d-flex flex-wrap">
            {order.items.map((item, i) => (
              <Card key={i} keds={item} />
            ))}
          </div>
        </div>
      ));
    }
  };

  return (
    <>
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>{t('orderPage.header')}</h1>
          <div>
            <p>
              {t('orderPage.ordersCount')} {orders.length}
            </p>
            <p>
              {t('orderPage.ordersTotal')} {ordersTotal(orders)} {t('money')}
            </p>
          </div>
        </div>

        <div className="flex-wrap">{renderItems()}</div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Orders;
