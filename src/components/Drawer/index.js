import React from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import Info from '../CartInfo';
import useCart from '../../hooks/useCart';
import styles from './Drawer.module.scss';
import { routes } from '../../routes';

const Drawer = ({ onRemoveFromCart, openCart, cartOpened }) => {
  const { cartItems, setCartItems, totalPrice } = useCart();
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [orderId, setOrderId] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const notify = (msg) => toast.error(msg);
  const { t } = useTranslation();
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve), ms);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(routes.orders, { items: cartItems });
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        const [cartIdKed] = cartItems.filter(
          (i) => i.parentId === item.parentId
        );
        await axios.delete(`${routes.cart}/${cartIdKed.id}`);
        await delay(1000);
      }
    } catch (err) {
      notify(t('errors.addToBasket'));
    }
    setIsLoading(false);
  };

  return (
    <div
      className={`${styles.overlay} ${cartOpened ? styles.overlayVisible : ''}`}
    >
      <div className={styles.drawer}>
        <h2 className="d-flex justify-between mb-30">
          {t('cartInfo.cart')}{' '}
          <img
            onClick={openCart}
            className="cu-p"
            src="/img/btn-remove.svg"
            alt={t('imgAlt.close')}
          ></img>
        </h2>

        {cartItems.length === 0 ? (
          <Info
            title={
              isOrderComplete
                ? t('cartInfo.orderConfirm')
                : t('cartInfo.cartEmpty')
            }
            descripton={
              isOrderComplete
                ? `${t('cartInfo.order')}${orderId} ${t(
                    'cartInfo.curierServise'
                  )}`
                : t('cartInfo.makeOneOrder')
            }
            image={
              isOrderComplete
                ? '/img/complete-order.jpg'
                : '/img/empty-cart.jpg'
            }
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
                    alt={t('imgAlt.remove')}
                  ></img>
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>{t('cartInfo.total')}</span>
                  <div></div>
                  <b>{totalPrice}{' '}{t('money')}</b>
                </li>

                <li>
                  <span>{t('cartInfo.tax')}</span>
                  <div></div>
                  <b>{parseFloat((totalPrice / 100) * 5).toFixed(2)}{' '}{t('money')}</b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                className="greenButton"
                onClick={onClickOrder}
              >
                {t('cartInfo.takeOrder')}<img src="/img/arrow.svg" alt={t('imgAlt.arrow')}></img>
              </button>
            </div>
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Drawer;
