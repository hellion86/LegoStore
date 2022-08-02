import React from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import Card from '../components/Card';
import { routes } from '../routes';

// todo
// кнопка удаления заказов
// счечтик заказа с суммой
// печатная форма?
// выводим состояние что заказов нет, если их нет

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const { t } = useTranslation();
  const ordersTotal = orders.reduce((acc, item) => acc + item.price, 0);

  React.useEffect(() => {
    const loadOrders = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(routes.orders);
        console.log(data)
        const concatOrders = data.map((order) => order.items).flat();
        setOrders(concatOrders);
        setIsLoading(false);
      } catch (err) {
        alert(t('errors.orderErr'));
      }
    };
    loadOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItems = () => {
    return (isLoading ? [...Array(4)] : orders).map((ked, index) => (
      <Card key={index} keds={ked} loading={isLoading} />
    ));
  };

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>{t('orderPage.header')}</h1>
        <div>
          <p>Всего заказов: {orders.length}</p>
          <p>На сумму: {ordersTotal} руб.</p>
        </div>
      </div>

      <div className="d-flex flex-wrap">{renderItems()}</div>
    </div>
  );
};

export default Orders;
