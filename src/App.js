import React from 'react';
// import axios from 'axios';
import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';

function App() {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [cartOpened, setCartOpened] = React.useState(false);

  const openCart = () => {
    setCartOpened(!cartOpened);
  }
  const onPlus = () => {
    console.log('пуш зе баттон')
  }
  
  const onClickFavorite = () => {
    console.log('пуш зе баттон')
  }

  React.useEffect(() => {
    fetch('https://62e0ecaefa8ed271c48a1a66.mockapi.io/items')
    .then((data) => data.json())
    .then((d) => setItems(d))
  }, [])
  
  const onAddToCart = (ked) => {
    const isKedInState = cartItems.filter((obj) => obj.keds.id === ked.keds.id);
    if (isKedInState.length === 0) {
      const newTov = [...cartItems, ked];
      setCartItems(newTov);
    }

  }

  const onRemoveFromCart = (ked) => {
    const newCartItems = cartItems.filter((obj) => obj.keds.id !== ked.id);
    setCartItems(newCartItems);
  }

  const drawerSum = () => {
    const totalSum = cartItems.reduce((acc, { keds }) => {
      acc = acc + keds.price;
      return acc;
    }, 0);
    return totalSum;
  }

  return (
    <div className="wrapper clear">
    {cartOpened && <Drawer openCart={openCart} items={cartItems} drawerSum={drawerSum} onRemoveFromCart={onRemoveFromCart}/>}
      <Header openCart={openCart} drawerSum={drawerSum}/>
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search"></img>
            <input placeholder="Поиск..."></input>
          </div>
        </div>
        <div className="d-flex flex-wrap">
          {items.map((ked) => (
            <div key={ked.id}>
              <Card keds={ked} onPlus={(obj) => onAddToCart(obj)} onClickFavorite={onClickFavorite}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
