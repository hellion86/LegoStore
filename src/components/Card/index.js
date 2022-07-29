import React from 'react';
import styles from './Card.module.scss';
import ContentLoader from 'react-content-loader';
import { AppContext  } from '../../context';

const MyLoader = () => (
  <ContentLoader
    speed={2}
    width={165}
    height={250}
    viewBox="0 0 155 265"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="10" ry="10" width="155" height="155" />
    <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
    <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
    <rect x="0" y="234" rx="5" ry="5" width="80" height="25" />
    <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
  </ContentLoader>
);

const Card = ({
  keds,
  onAddToCart,
  onAddToFavotite,
  favorited = false,
  loading = false,
}) => {
  const { isItemAdded } = React.useContext(AppContext);
  // const [isAdded, setAdded] = React.useState(added);
  const [isFavorite, setIsFavorite] = React.useState(favorited);
  // console.log(keds.id)
  const onClickFavorite = () => {
    onAddToFavotite({ ...keds });
    setIsFavorite(!isFavorite);
  };

  const onClickPlus = (id) => {
    console.log(id)
    // onPlus({ ...keds });
    // setAdded(!isAdded);
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <MyLoader />
      ) : (
        <>
          <div className={styles.favorite}>
            <img
              src={isFavorite ? 'img/liked.svg' : 'img/unliked.svg'}
              alt="unliked"
              onClick={onClickFavorite}
            />
          </div>
          <img width='100%' height={135} src={keds.imageUrl} alt="snikers_1" />
          <h5>{keds.title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена</span>
              <b> {keds.price} руб.</b>
            </div>
            <img
              className={styles.plus}
              // onClick={() => onClickPlus(keds.id)}
              onClick={() => onAddToCart(keds)}
              src={isItemAdded(keds && keds.id) ? '/img/btn-checked.svg' : '/img/btn-plus.svg'}
              alt="add"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
