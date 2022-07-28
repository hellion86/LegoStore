import React from 'react';
import axios from 'axios';
import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [favorites, setFavorites] = React.useState([])

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
  }, []);

  const onAddToCart = (ked) => {
    const isKedInState = cartItems.filter((obj) => obj.id === ked.id);
    if (isKedInState.length === 0) {
      axios.post('https://62e0ecaefa8ed271c48a1a66.mockapi.io/cart', ked);
      setCartItems((prev) => [...prev, ked]);
    }
  };

  const onRemoveFromCart = (id) => {
    const newCartItems = cartItems.filter((obj) => obj.id !== id);
    setCartItems(newCartItems);
    axios.delete(`https://62e0ecaefa8ed271c48a1a66.mockapi.io/cart/${id}`);
  };
  
  const onAddToFavotite = (ked) => {
    setFavorites((prev) => [...prev, ked])
    axios.post(`https://62e0ecaefa8ed271c48a1a66.mockapi.io/favorites`, ked);
  };

  const drawerSum = () => {
    const totalSum = cartItems.reduce((acc, ked) => {
      acc = acc + ked.price;
      return acc;
    }, 0);
    return totalSum;
  };

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
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>
            {searchValue
              ? `Поиск по запросу: "${searchValue}"`
              : `Все кроссовки`}
          </h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            {searchValue && (
              <img
                className="clearSearch cu-p"
                src="/img/btn-remove.svg"
                alt="clearSearch"
                onClick={clearSearch}
              />
            )}
            <input
              onChange={onChangeSearchInput}
              value={searchValue}
              placeholder="Поиск..."
            ></input>
          </div>
        </div>
        <div className="d-flex flex-wrap">
          {items
            .filter((k) =>
              k.title.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((ked) => (
              <div key={ked.id}>
                <Card
                  keds={ked}
                  onFavorite={(obj) => onAddToFavotite(obj)}
                  onPlus={(obj) => onAddToCart(obj)}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
