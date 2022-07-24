import styles from './Card.module.scss';

// console.log(styles)

function Card(props) {
  const {keds} = props;
  // console.log(keds)
  const path = `/img/sneakers/${keds.id}.jpg`;
  return (
    <div className={styles.card}>
      <div className={styles.favorite}>
        <img src="img/unliked.svg" alt="unliked" />
      </div>
      <img width={133} height={112} src={path} alt="snikers_1" />
      <h5>{keds.name}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена</span>
          <b> {keds.price} руб.</b>
        </div>
        <button className="button">
          <img src="/img/plus.svg" width={11} height={11} alt="add" />
        </button>
      </div>
    </div>
  );
}

export default Card;