import React from 'react';
import { AppContext } from '../context';
import { useTranslation } from 'react-i18next';

const Info = ({ title, image,  descripton, button = true }) => {
  const {  openCart } = React.useContext(AppContext)
  const { t } = useTranslation();

  return (
    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
      <img
        className="mb-20"
        width={120}
        src={image}
        alt={t('imgAlt.none')}
      />
      <h2>{title}</h2>
      <p className="opacity-6">
        {descripton}
      </p>
      {button && <button className="greenButton" onClick={openCart}>
        <img src="/img/arrow.svg" alt={t('imgAlt.back')} />
        {t('cartInfo.moveBack')}
      </button>}
    </div>
  );
};

export default Info;
