import DashboardTemplate from "templates/Dashboard";
import Footer from "components/Footer";
import OrderBook, { Entry } from "components/OrderBook";

const asks: Entry[] = [
  {
    price: 5000,
    size: 8000,
    total: 9000,
  },
  {
    price: 4000,
    size: 8000,
    total: 9000,
  },
  {
    price: 3000,
    size: 8000,
    total: 9000,
  },
];
const bids: Entry[] = [
  {
    price: 5000,
    size: 8000,
    total: 9000,
  },
  {
    price: 4000,
    size: 8000,
    total: 9000,
  },
  {
    price: 3000,
    size: 8000,
    total: 9000,
  },
  {
    price: 2000,
    size: 8000,
    total: 9000,
  },
];
function App() {
  return (
    <div className="App">
      <DashboardTemplate
        Body={
          // <Orderbook
          //   bids={bids}
          //   asks={asks}
          //   spread={50}
          //   aggregation={34}
          //   onUpdateAggregate={() => {}}
          // />
          <OrderBook aggregation={3} spread={15} asks={asks} bids={bids} />
        }
        Sidebar={<div></div>}
        Footer={<Footer />}
      />
    </div>
  );
}

export default App;
