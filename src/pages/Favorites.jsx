import React from 'react';
import Card from '../components/Card';
import { useTranslation } from 'react-i18next';

// todo выводим сообщение что нет закладок или выводим закладки
const Favorites = ({ favorites, onAddToFavotite, onAddToCart }) => {
  const { t } = useTranslation();

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>{t('favoritesPage.header')}</h1>
      </div>
      <div className="d-flex flex-wrap">
        {favorites.map((ked) => (
          <div key={ked.id}>
            <Card
              keds={ked}
              onAddToFavotite={() => onAddToFavotite(ked)}
              onAddToCart={() => onAddToCart(ked)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
