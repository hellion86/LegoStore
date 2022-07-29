import React from 'react';
import Card from '../components/Card';
// import { AppContext } from '../context'

function Home({
  searchValue,
  clearSearch,
  onChangeSearchInput,
  onAddToCart,
  favorites,
  onAddToFavotite,
  items,
  isLoading,
}) {
  // const { isItemAdded } = React.useContext(AppContext);
  // console.log(items)
  const renderItems = () => {
    const filteredItems = items.filter((k) =>
      k.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    return (isLoading ? [...Array(8)] : filteredItems).map((ked, index) => (
        <Card
          loading={isLoading}
          key={index}
          keds={ked}
          onAddToFavotite={() => onAddToFavotite(ked)}
          onAddToCart={onAddToCart}
          // added={isItemAdded(ked && ked.id)}
          favorited={favorites.some((obj) => Number(obj.id) === Number(ked.id))}
        />
    ));
  };

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>
          {searchValue ? `Поиск по запросу: "${searchValue}"` : `Все кроссовки`}
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
      <div className="d-flex flex-wrap">{renderItems()}</div>
    </div>
  );
}

export default Home;
