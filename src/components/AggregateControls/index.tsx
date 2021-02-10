import Row from "atoms/Row";
import ButtonGroup from "components/ButtonGroup";

interface AggregateControlsProps {
  aggregation: number;
  onAggregateSelected: (newAggregate: number) => void;
}

const AggregateControls = ({
  aggregation,
  onAggregateSelected,
}: AggregateControlsProps) => {
  return (
    <Row>
      <span>Aggregation</span>
      <span>{aggregation}</span>
      <ButtonGroup onButtonClick={(ss: string) => {}} />
    </Row>
  );
};

export default AggregateControls;
