import React from 'react';
import styles from './Card.module.scss';

function Card({ keds, onPlus, onAddToFavotite, favorited = false}) {
  const [isAdded, setAdded] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(favorited);
  
  const onClickFavorite = () => {
    onAddToFavotite({ ...keds })
    setIsFavorite(!isFavorite)
  };
  
  const onClickPlus = () => {
    onPlus({ ...keds });
    setAdded(!isAdded);
  };

  return (
    <div className={styles.card}>
      <div className={styles.favorite}>
        <img src={isFavorite ? "img/liked.svg" : "img/unliked.svg"} alt="unliked" onClick={onClickFavorite} />
      </div>
      <img width={133} height={112} src={keds.imageUrl} alt="snikers_1" />
      <h5>{keds.title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена</span>
          <b> {keds.price} руб.</b>
        </div>
        <img
          className={styles.plus}
          onClick={onClickPlus}
          src={isAdded ? '/img/btn-checked.svg' : '/img/btn-plus.svg'}
          alt="add"
        />
      </div>
    </div>
  );
}

export default Card;
