import React from 'react';

function Drawer({ openCart, items, drawerSum, onRemoveFromCart }) {

  const cartSum = drawerSum();
  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="d-flex justify-between mb-30">
          Корзина{' '}
          <img
            onClick={openCart}
            className="cu-p"
            src="/img/btn-remove.svg"
            alt="Close"
          ></img>
        </h2>
        <div className="items">
          {items.map(({ keds }) => (
            <div key={keds.id} className="cartItem d-flex align-center mb-20">
              <div
                style={{ backgroundImage: `url(${keds.imageUrl})` }}
                className="cartItemImg"
              ></div>
              <div className="mr-20 flex">
                <p className="mb-5">{keds.title}</p>
                <b>{keds.price}</b>
              </div>
              <img
                onClick={() => onRemoveFromCart(keds)}
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
              <b>{cartSum} руб.</b>
            </li>

            <li>
              <span>Налог 5%:</span>
              <div></div>
              <b>{Math.round(cartSum * 0.05)} руб.</b>
            </li>
          </ul>
          <button className="greenButton">
            Оформить заказ <img src="/img/arrow.svg" alt="arrow"></img>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Drawer;
