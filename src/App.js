import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";

const arr = [
  {id: 1, name: 'Кроссовки1', price: '5999'},
  {id: 2, name: 'Кроссовки2', price: 7999},
  {id: 3, name: 'Кроссовки3', price: 12999},
  {id: 4, name: 'Кроссовки4', price: '2999'},
]

function App() {
  return (
    <div className="wrapper clear">
     
      <Drawer />
      <Header />

      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search"></img>
            <input placeholder="Поиск..."></input>
          </div>
        </div>
        <div className="d-flex">
          {arr.map((ked) => 
          <div key={ked.id}>
            <Card keds={ked} />
          </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default App;
