import Button from "atoms/Button";

export type Direction = "INCREMENT" | "DECREMENT";

interface ButtonGroupProps {
  onButtonClick: (direction: Direction) => void;
}

const ButtonGroup = ({ onButtonClick }: ButtonGroupProps) => {
  return (
    <div>
      <Button onClick={() => onButtonClick("DECREMENT")}> - </Button>
      <Button onClick={() => onButtonClick("INCREMENT")}> + </Button>
    </div>
  );
};

export default ButtonGroup;
