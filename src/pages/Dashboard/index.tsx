import { useState, lazy, Suspense, useContext, useCallback } from "react";
import DashboardTemplate from "templates/Dashboard";
import ProductList from "components/ProductList";
import { StoreContext } from "store";
import { DEFAULT_GROUPSIZE, MAX_DISPLAY_COUNT } from "atoms/constants";
import { getBidGroups, getAskGroups, getSpread } from "selectors";
import { OrderGroup } from "data/model";
const OrderBook = lazy(
  /* webpackChunkName: "order-book" */ () => import("components/OrderBook")
);

/**
 *
 * Transforms ordergroup listing into consumable format for lower components
 */
const transform = (orderGroups: OrderGroup[]) =>
  orderGroups.map((entry) => {
    return {
      price: entry[0],
      size: entry[1],
      total: entry[2],
    };
  });

function App() {
  const { state, selectProduct } = useContext(StoreContext)!;
  const [aggregate, setAggregate] = useState(DEFAULT_GROUPSIZE);

  const onAggregateChange = useCallback((newAggregate) => {
    if (newAggregate >= 1) {
      setAggregate(Math.round(newAggregate * 2) / 2);
    }
  }, []);
  let asks = getAskGroups(state.asks, aggregate, MAX_DISPLAY_COUNT);
  const bids = getBidGroups(state.bids, aggregate, MAX_DISPLAY_COUNT);
  return (
    <DashboardTemplate
      Body={
        <>
          <Suspense fallback="Loading">
            <OrderBook
              aggregateChangeFactor={2}
              onUpdateAggregate={onAggregateChange}
              aggregation={aggregate}
              spread={getSpread(bids, asks)}
              asks={transform(asks)}
              bids={transform(bids)}
            />
          </Suspense>
        </>
      }
      Sidebar={
        <ProductList
          onSelected={selectProduct}
          currentProduct={state.selectedProduct}
        />
      }
    />
  );
}

export default App;
