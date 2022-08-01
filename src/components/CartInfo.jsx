import React from 'react';
import { AppContext } from '../context';

const Info = ({ title, image,  descripton }) => {
  const {  openCart } = React.useContext(AppContext)

  return (
    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
      <img
        className="mb-20"
        width={120}
        src={image}
        alt="Пусто"
      />
      <h2>{title}</h2>
      <p className="opacity-6">
        {descripton}
      </p>
      <button className="greenButton" onClick={openCart}>
        <img src="/img/arrow.svg" alt="Назад" />
        Вернуться назад
      </button>
    </div>
  );
};

export default Info;
