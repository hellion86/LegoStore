import React from 'react';
import axios from 'axios';
import Info from '../info';
import useCart from '../../hooks/useCart';
import styles from './Drawer.module.scss'

const Drawer = ({ onRemoveFromCart, openCart, cartOpened}) => {
  const {cartItems, setCartItems, totalPrice} = useCart();
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [orderId, setOrderId] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve), ms);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const {data} = await axios.post('https://62e0ecaefa8ed271c48a1a66.mockapi.io/orders', { items: cartItems});
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);
 
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        // console.log(item)
        const [cartIdKed] = cartItems.filter((i) => i.parentId === item.parentId);
        await axios.delete(`https://62e0ecaefa8ed271c48a1a66.mockapi.io/cart/${cartIdKed.id}`);
        await delay(1000);
      }

    } catch (err) {
      alert("Не удалось оформить заказ, попробуйте позже...")
    }
    setIsLoading(false);
  }

  // console.log(cartItems)
  return (
    <div className={`${styles.overlay} ${cartOpened ? styles.overlayVisible : "" }`}>
      <div className={styles.drawer}>
        <h2 className="d-flex justify-between mb-30">
          Корзина{' '}
          <img
            onClick={openCart}
            className="cu-p"
            src="/img/btn-remove.svg"
            alt="Close"
          ></img>
        </h2>

        {cartItems.length === 0 ? (
          <Info
            title={isOrderComplete ? "Заказ оформлен!" :"Корзина пустая"}
            descripton={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской службе` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}
            image={isOrderComplete ? "/img/complete-order.jpg" : "/img/empty-cart.jpg"}
          />
        ) : (
          <>
            <div className="items flex">
              {cartItems.map((ked) => (
                <div
                  key={ked.id}
                  className="cartItem d-flex align-center mb-20"
                >
                  <div
                    style={{ backgroundImage: `url(${ked.imageUrl})` }}
                    className="cartItemImg"
                  ></div>
                  <div className="mr-20 flex">
                    <p className="mb-5">{ked.title}</p>
                    <b>{ked.price}</b>
                  </div>
                  <img
                    onClick={() => onRemoveFromCart(ked.parentId)}
                    className="removeBtn"
                    src="/img/btn-remove.svg"
                    alt="Remove"
                  ></img>
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice} руб.</b>
                </li>

                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{parseFloat(totalPrice / 100 * 5).toFixed(2)} руб.</b>
                </li>
              </ul>
              <button disabled={isLoading} className="greenButton" onClick={onClickOrder}>
                Оформить заказ <img src="/img/arrow.svg" alt="arrow"></img>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Drawer;
