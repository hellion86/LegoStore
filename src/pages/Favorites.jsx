import React from 'react';
import Card from '../components/Card';
// import { AppContext } from '../context';

function Favorites({favorites, onAddToFavotite, onAddToCart }) {
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои закладки</h1>
      </div>
      <div className="d-flex flex-wrap">
        {favorites.map((ked) => (
          <div key={ked.id}>
            <Card
              keds={ked}
              // favorited={true}
              onAddToFavotite={() => onAddToFavotite(ked)}
              onAddToCart={() => onAddToCart(ked)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;
