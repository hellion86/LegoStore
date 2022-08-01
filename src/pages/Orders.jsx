import React from 'react';
import axios from 'axios';
import Card from '../components/Card';
import { useState } from 'react';
import { routes } from '../routes';
  
  // todo
  // кнопка удаления заказов
  // счечтик заказа с суммой
  // печатная форма?
  // выводим состояние что заказов нет, если их нет

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
 
  React.useEffect(() => {
    const loadOrders = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(routes.orders);
        const concatOrders = data.map((order) => order.items).flat();
        setOrders(concatOrders);
        setIsLoading(false);
      } catch (err) {
        alert('Не удалось выполнить загрузку заказов');
      }
    };
    loadOrders();
  }, []);

  const renderItems = () => {
    return (isLoading ? [...Array(4)] : orders).map((ked, index) => (
      <Card key={index} keds={ked} loading={isLoading} />
    ));
  };
  
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои Заказы</h1>
      </div>
      <div className="d-flex flex-wrap">{renderItems()}</div>
    </div>
  );
};

export default Orders;
