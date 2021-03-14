import Row from "./Row";

export type Entry = {
  price: number;
  size: number;
  total: number;
};

type Category = "bids" | "asks";
interface OrderBookProps {
  entries: Entry[];
  category: Category;
}

const OrderTable = ({ entries, category, ...rest }: OrderBookProps) => {
  return (
    <>
      {entries.map((entry) => (
        <Row
          key={entry.price}
          price={entry.price}
          size={entry.size}
          total={entry.total}
          category={category}
        />
      ))}
    </>
  );
};

export default OrderTable;
