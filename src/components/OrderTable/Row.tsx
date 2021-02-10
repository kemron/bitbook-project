import Row from "atoms/Row";

const formatter = (value: number) => new Intl.NumberFormat().format(value);

type OrderTableRowProps = {
  price: number;
  size: number;
  total: number;
  category: string;
};

const OrderTableRow = ({
  price,
  size,
  total,
  category,
}: OrderTableRowProps) => (
  <Row>
    <span className={`color-${category}`}>{formatter(price)}</span>
    <span>{formatter(size)}</span>
    <span>{formatter(total)}</span>
  </Row>
);

export default OrderTableRow;
