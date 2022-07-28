import React from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Header from './components/Header';
import Drawer from './components/Drawer';

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [favorites, setFavorites] = React.useState([]);

  const openCart = () => setCartOpened(!cartOpened);
  const clearSearch = () => setSearchValue('');
  const onChangeSearchInput = (e) => setSearchValue(e.target.value);

  // Fetch data from back
  React.useEffect(() => {
    axios
      .get('https://62e0ecaefa8ed271c48a1a66.mockapi.io/items')
      .then((res) => setItems(res.data));
    axios
      .get('https://62e0ecaefa8ed271c48a1a66.mockapi.io/cart')
      .then((res) => setCartItems(res.data));
    axios
      .get('https://62e0ecaefa8ed271c48a1a66.mockapi.io/favorites')
      .then((res) => setFavorites(res.data));
  }, []);
  // cart functions
  const onAddToCart = (ked) => {
    const isKedInState = cartItems.filter((obj) => obj.id === ked.id);
    if (isKedInState.length === 0) {
      axios.post('https://62e0ecaefa8ed271c48a1a66.mockapi.io/cart', ked);
      setCartItems((prev) => [...prev, ked]);
    }
  };

  const onAddToFavotite = async (ked) => {
    try {
      if (favorites.find((obj) => obj.id === ked.id)) {
        axios.delete(
          `https://62e0ecaefa8ed271c48a1a66.mockapi.io/favorites/${ked.id}`
        );
        const newFavorites = favorites.filter((obj) => obj.id !== ked.id);
        setFavorites(newFavorites);
      } else {
        const { data } = await axios.post(`https://62e0ecaefa8ed271c48a1a66.mockapi.io/favorites`, ked);
        setFavorites((prev) => [...prev, data]);
      }
    } catch (err) {
      alert('Не удалось добавить в закладки')
    }
  };

  const onRemoveFromCart = (id) => {
    const newCartItems = cartItems.filter((obj) => obj.id !== id);
    setCartItems(newCartItems);
    axios.delete(`https://62e0ecaefa8ed271c48a1a66.mockapi.io/cart/${id}`);
  };
  
  const drawerSum = () => {
    const totalSum = cartItems.reduce((acc, ked) => {
      acc = acc + ked.price;
      return acc;
    }, 0);
    return totalSum;
  };
 // render
  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer
          openCart={openCart}
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
              searchValue={searchValue}
              clearSearch={clearSearch}
              onChangeSearchInput={onChangeSearchInput}
              items={items}
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
              favorites={favorites}
              onAddToFavotite={onAddToFavotite}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
