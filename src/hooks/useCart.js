import React from 'react';
import { AppContext } from '../context';

const useCart = () => {
  const { cartItems, setCartItems } = React.useContext(AppContext);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  return { cartItems, setCartItems, totalPrice };
};

export default useCart;
