import Row from "atoms/Row";
import AggregateControls, { Direction } from "components/AggregateControls";
import OrderTable, { Entry } from "components/OrderTable";
import { useCallback } from "react";
import OrderBookContainer from "./Container";
import Header from "./Header";
import Footer from "./Footer";

export type { Entry };

type OrderBookProps = {
  spread: number;
  aggregation: number;
} & typeof defaultProps;

const defaultProps = {
  aggregateChangeFactor: 2,
  asks: [] as Entry[],
  bids: [] as Entry[],
  onUpdateAggregate: (newAggregate: number) => {},
};

const OrderBook = ({
  aggregateChangeFactor,
  bids,
  asks,
  onUpdateAggregate,
  spread,
  aggregation,
}: OrderBookProps) => {
  const onAggregateChange = useCallback(
    (direction: Direction) => {
      const factor =
        direction === "INCREMENT"
          ? aggregateChangeFactor
          : 1 / aggregateChangeFactor;
      const newAggregation = aggregation * factor;
      onUpdateAggregate(newAggregation);
    },
    [aggregateChangeFactor, aggregation, onUpdateAggregate]
  );

  return (
    <OrderBookContainer>
      <Header>
        <Row>
          <div>Price</div>
          <div>Size</div>
          <div>Total</div>
        </Row>
      </Header>

      <OrderTable entries={asks} category="asks" />
      <Header>
        <Row>
          <div>Spread </div>
          <div>{spread}</div>
        </Row>
      </Header>
      <OrderTable entries={bids} category="bids" />

      <Footer>
        <AggregateControls
          aggregation={aggregation}
          onAggregateSelected={onAggregateChange}
        />
      </Footer>
    </OrderBookContainer>
  );
};

OrderBook.defaultProps = defaultProps;

export default OrderBook;
