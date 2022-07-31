import React from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Header from './components/Header';
import Drawer from './components/Drawer';
import { AppContext } from './context';

const App = () => {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [favorites, setFavorites] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const openCart = () => setCartOpened(!cartOpened);
  const clearSearch = () => setSearchValue('');
  const onChangeSearchInput = (e) => setSearchValue(e.target.value);

  // Fetch data from back
  React.useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const cartData = await axios.get(
        'https://62e0ecaefa8ed271c48a1a66.mockapi.io/cart'
      );
      const favorData = await axios.get(
        'https://62e0ecaefa8ed271c48a1a66.mockapi.io/favorites'
      );
      const itemsData = await axios.get(
        'https://62e0ecaefa8ed271c48a1a66.mockapi.io/items'
      );
      setCartItems(cartData.data);
      setFavorites(favorData.data);
      setItems(itemsData.data);
      setIsLoading(false);
    };
    loadData();
  }, []);
  // cart functions
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
        axios.delete(
          `https://62e0ecaefa8ed271c48a1a66.mockapi.io/cart/${cartIdKed.id}`
        );
      } else {
        const { data } = await axios.post(
          'https://62e0ecaefa8ed271c48a1a66.mockapi.io/cart',
          ked
        );
        setCartItems((prev) => [...prev, data]);
      }
    } catch (err) {
      alert('не удалось добавить товар в корзину');
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
        axios.delete(
          `https://62e0ecaefa8ed271c48a1a66.mockapi.io/favorites/${favIdKed.id}`
        );
      } else {
        const { data } = await axios.post(
          `https://62e0ecaefa8ed271c48a1a66.mockapi.io/favorites`,
          ked
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (err) {
      alert('Не удалось добавить в закладки');
    }
  };

  const onRemoveFromCart = (id) => {
    const newCartItems = cartItems.filter(
      (obj) => Number(obj.parentId) !== Number(id)
    );
    setCartItems(newCartItems);
    const [cartIdKed] = cartItems.filter((i) => i.parentId === id);
    axios.delete(
      `https://62e0ecaefa8ed271c48a1a66.mockapi.io/cart/${cartIdKed.id}`
    );
  };

  const drawerSum = () =>
    cartItems.reduce((acc, ked) => {
      acc = acc + ked.price;
      return acc;
    }, 0);

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
        {cartOpened && (
          <Drawer
            // openCart={openCart}
            items={cartItems}
            drawerSum={drawerSum}
            onRemoveFromCart={onRemoveFromCart}
          />
        )}
        <Header openCart={openCart} drawerSum={drawerSum} />
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
        </Routes>
      </div>
    </AppContext.Provider>
  );
};

export default App;
