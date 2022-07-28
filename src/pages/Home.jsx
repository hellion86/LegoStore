import Card from "../components/Card";

function Home({searchValue, clearSearch, onChangeSearchInput, onAddToCart, onAddToFavotite, items}) {
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
      <div className="d-flex flex-wrap">
        {items
          .filter((k) =>
            k.title.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map((ked) => (
            <div key={ked.id}>
              <Card
                keds={ked}
                onAddToFavotite={() => onAddToFavotite(ked)}
                onPlus={(obj) => onAddToCart(obj)}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;
