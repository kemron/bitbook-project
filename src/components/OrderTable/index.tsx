import Row from "atoms/Row";

export type Entry = {
  price: number;
  size: number;
  total: number;
};

interface OrderBookProps {
  entries: Entry[];
}

const OrderTable = ({ entries }: OrderBookProps) => {
  return (
    <>
      {entries.map((entry) => (
        <Row key={entry.price}>
          <span>{entry.price}</span>
          <span>{entry.size}</span>
          <span>{entry.total}</span>
        </Row>
      ))}
    </>
  );
};

export default OrderTable;
