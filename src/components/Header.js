import { Link } from 'react-router-dom';

function Header({ openCart, drawerSum }) {
  const cartSum = drawerSum();
  // const cartSum = 1000;
  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to="/">
        <div className="d-flex align-center">
          <img width={40} heigth={40} src="/img/logo.png" alt="логотип" />
          <div>
            <h3 className="text-uppercase">React snikers</h3>
            <p className="opacity-5">Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <ul className="d-flex">
        <li className="mr-30 cu-p" onClick={openCart}>
          <img width={18} heigth={18} src="/img/cart.svg" alt="корзина" />
          <span>{cartSum}руб.</span>
        </li>
        <li className=" mr-10 cu-p">
          <Link to="/favorites">
            <img width={18} heigth={18} src="/img/heart.svg" alt="Закладки" />
          </Link>
        </li>
        <li className=" cu-p">
          <img width={18} heigth={18} src="/img/user.svg" alt="пользователь" />
        </li>
      </ul>
    </header>
  );
}
export default Header;
