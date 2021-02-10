import Row from "atoms/Row";
import ButtonGroup, { Direction } from "components/ButtonGroup";

export type { Direction };

interface AggregateControlsProps {
  aggregation: number;
  onAggregateSelected: (newAggregate: Direction) => void;
}

const AggregateControls = ({
  aggregation,
  onAggregateSelected,
}: AggregateControlsProps) => {
  return (
    <Row>
      <span>Aggregation</span>
      <span>{aggregation}</span>
      <ButtonGroup onButtonClick={onAggregateSelected} />
    </Row>
  );
};

export default AggregateControls;
