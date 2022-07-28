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

        {items.length === 0 ? (
          <div className="cartEmpty d-flex align-center justify-center flex-column flex">
            <img
              className="mb-20"
              width={120}
              heigth={120}
              src="/img/empty-cart.jpg"
              alt="Пусто"
            />
            <h2>Корзина пустая</h2>
            <p className="opacity-6">
              Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ
            </p>
            <button className="greenButton" onClick={openCart}>
              <img  src="/img/arrow.svg" alt="Назад" />
              Вернуться назад
            </button>
          </div>
        ) : (
          <>
            <div className="items">
              {items.map((ked) => (
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
                    onClick={() => onRemoveFromCart(ked.id)}
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
                  <b>{Math.ceil(cartSum * 0.05)} руб.</b>
                </li>
              </ul>
              <button className="greenButton">
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
