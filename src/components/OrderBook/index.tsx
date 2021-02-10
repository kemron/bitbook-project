import Row from "atoms/Row";
import AggregateControls from "components/AggregateControls";
import OrderTable, { Entry } from "components/OrderTable";
import OrderBookContainer from "./Container";
import Header from "./Header";

export type { Entry };

interface OrderBookProps {
  displayCount?: number;
  asks?: Entry[];
  bids?: Entry[];
  spread: number;
  aggregation: number;
  onUpdateAggregate?: (update: number) => void;
}

const defaultProps = {
  displayCount: 15,
  asks: [],
  bids: [],
  onUpdateAggregate: () => {},
};

const OrderBook = ({
  displayCount,
  bids,
  asks,
  onUpdateAggregate,
  spread,
  aggregation,
}: OrderBookProps) => {
  return (
    <OrderBookContainer>
      <Header>
        <Row>
          <div>Price</div>
          <div>Size</div>
          <div>Total</div>
        </Row>
      </Header>

      <OrderTable entries={asks!} />
      <Header>
        <Row>
          <div>Spread </div>
          <div>{spread}</div>
        </Row>
      </Header>
      <OrderTable entries={bids!} />

      <Header>
        <AggregateControls aggregation={50} onAggregateSelected={() => {}} />
      </Header>
    </OrderBookContainer>
  );
};

OrderBook.defaultProps = defaultProps;

export default OrderBook;
