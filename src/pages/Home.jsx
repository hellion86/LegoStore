import React from 'react';
import Card from '../components/Card';
import { useTranslation } from 'react-i18next';

const Home = ({
  searchValue,
  clearSearch,
  onChangeSearchInput,
  onAddToCart,
  onAddToFavotite,
  items,
  isLoading,
}) => {
  const { t } = useTranslation();
  const renderItems = () => {
    const filteredItems = items.filter((k) =>
      k.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    return (isLoading ? [...Array(8)] : filteredItems).map((ked, index) => (
      <Card
        loading={isLoading}
        key={index}
        keds={ked}
        onAddToFavotite={onAddToFavotite}
        onAddToCart={onAddToCart}
      />
    ));
  };

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>
          {searchValue ? `${t('homePage.searchBy')} "${searchValue}"` : t('homePage.header')}
        </h1>
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt={t('imgAlt.search')} />
          {searchValue && (
            <img
              className="clearSearch cu-p"
              src="/img/btn-remove.svg"
              alt={t('imgAlt.clearSearch')}
              onClick={clearSearch}
            />
          )}
          <input
            onChange={onChangeSearchInput}
            value={searchValue}
            placeholder={t('homePage.find')}
          ></input>
        </div>
      </div>
      <div className="d-flex flex-wrap">{renderItems()}</div>
    </div>
  );
};

export default Home;
