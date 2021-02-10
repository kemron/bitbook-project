import Button from "atoms/Button";

export type Direction = "INCREMENT" | "DECREMENT";

interface ButtonGroupProps {
  onButtonClick: (direction: Direction) => void;
}

const ButtonGroup = ({ onButtonClick }: ButtonGroupProps) => {
  return (
    <div>
      <Button> - </Button>
      <Button> + </Button>
    </div>
  );
};

export default ButtonGroup;
