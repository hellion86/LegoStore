import React from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Orders from './components/Order';
import { AppContext } from './context';
import { routes } from './routes';

const App = () => {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [favorites, setFavorites] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const { t } = useTranslation();

  // help functions, open/close etc.
  const openCart = () => setCartOpened(!cartOpened);
  const clearSearch = () => setSearchValue('');
  const onChangeSearchInput = (e) => setSearchValue(e.target.value);

  // Fetch data from bd
  React.useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [cartData, favorData, itemsData] = await Promise.all([
          axios.get(routes.cart),
          axios.get(routes.favorites),
          axios.get(routes.items),
        ]);

        setCartItems(cartData.data);
        setFavorites(favorData.data);
        setItems(itemsData.data);
        setIsLoading(false);
      } catch (error) {
        alert(t('errors.mainLoad'));
      }
    };
    loadData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // main cart functions
  const onAddToCart = async (ked) => {
    try {
      if (
        cartItems.find((item) => Number(item.parentId) === Number(ked.parentId))
      ) {
        const newCartItems = cartItems.filter(
          (obj) => Number(obj.parentId) !== Number(ked.parentId)
        );
        setCartItems(newCartItems);
        const [cartIdKed] = cartItems.filter(
          (i) => i.parentId === ked.parentId
        );
        axios.delete(`${routes.cart}/${cartIdKed.id}`);
      } else {
        const { data } = await axios.post(routes.cart, ked);
        setCartItems((prev) => [...prev, data]);
      }
    } catch (err) {
      alert(t('errors.addToBasket'));
    }
  };

  const onAddToFavotite = async (ked) => {
    try {
      if (
        favorites.find((obj) => Number(obj.parentId) === Number(ked.parentId))
      ) {
        const newFavorites = favorites.filter(
          (obj) => Number(obj.parentId) !== Number(ked.parentId)
        );
        setFavorites(newFavorites);
        const [favIdKed] = favorites.filter((i) => i.parentId === ked.parentId);
        axios.delete(`${routes.favorites}/${favIdKed.id}`);
      } else {
        const { data } = await axios.post(routes.favorites, ked);
        setFavorites((prev) => [...prev, data]);
      }
    } catch (err) {
      alert(t('errors.addToFav'));
    }
  };

  const onRemoveFromCart = async (id) => {
    try {
      const newCartItems = cartItems.filter(
        (obj) => Number(obj.parentId) !== Number(id)
      );
      setCartItems(newCartItems);
      const [cartIdKed] = cartItems.filter((i) => i.parentId === id);
      axios.delete(`${routes.cart}/${cartIdKed.id}`);
    } catch (err) {
      alert(t('errors.removeFromBasket'));
    }
  };

  const isItemAdded = (id) =>
    cartItems.some((obj) => Number(obj.parentId) === Number(id));

  const isItemFav = (id) =>
    favorites.some((obj) => Number(obj.parentId) === Number(id));
  // render
  return (
    <AppContext.Provider
      value={{
        cartItems,
        favorites,
        items,
        isItemAdded,
        isItemFav,
        openCart,
        setCartItems,
      }}
    >
      <div className="wrapper clear">
        <Drawer
          openCart={openCart}
          cartOpened={cartOpened}
          onRemoveFromCart={onRemoveFromCart}
        />
        <Header openCart={openCart} />
        <Routes>
          <Route
            path="/"
            exact
            element={
              <Home
                items={items}
                favorites={favorites}
                searchValue={searchValue}
                isLoading={isLoading}
                clearSearch={clearSearch}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavotite={onAddToFavotite}
                onAddToCart={onAddToCart}
              />
            }
          />
          <Route
            path="/favorites"
            exact
            element={
              <Favorites
                onAddToFavotite={onAddToFavotite}
                onAddToCart={onAddToCart}
                favorites={favorites}
              />
            }
          />
          <Route path="/orders" exact element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
};

export default App;
