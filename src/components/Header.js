import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useCart from '../hooks/useCart';

const Header = ({ openCart }) => {
  const { totalPrice } = useCart();
  const { t, i18n } = useTranslation();
  const changeLang = (lng) => i18n.changeLanguage(lng);

  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to="/">
        <div className="d-flex align-center">
          <img width={40} heigth={40} src="/img/logo.png" alt={t('imgAlt.logo')} />
          <div>
            <h3 className="text-uppercase">{t('header.headLogo')}</h3>
            <p className="opacity-5">{t('header.headSlogan')}</p>
          </div>
        </div>
      </Link>
      <ul className="d-flex">
        <li className="mr-30 cu-p" onClick={openCart}>
          <img width={18} heigth={18} src="/img/cart.svg" alt={t('imgAlt.cart')} />
          <span>{totalPrice}{' '}{t('money')}</span>
        </li>
        <li className=" mr-10 cu-p">
          <Link to="/favorites">
            <img width={18} heigth={18} src="/img/heart.svg" alt={t('imgAlt.fav')} />
          </Link>
        </li>
        <li className="cu-p">
          <Link to="/orders">
            <img
              width={18}
              heigth={18}
              src="/img/user.svg"
              alt={t('imgAlt.user')}
            />
          </Link>
        </li>
        <li className="cu-p" onClick={() => changeLang('en')}>
          EN
        </li>
        {'|'}
        <li className="cu-p" onClick={() => changeLang('ru')}>
          RU
        </li>
      </ul>
    </header>
  );
};
export default Header;
