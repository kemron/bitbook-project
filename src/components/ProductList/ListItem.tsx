import styled from "@emotion/styled";
import theme from "atoms/theme";

type RowProps = {
  isSelected?: boolean;
};

const ListItem = styled.div<RowProps>`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 1.2em;
  justify-content: center;
  text-transform: uppercase;
  flex-grow: 1;
  padding-top: 10px;
  padding-bottom: 10px;
  ${({ isSelected }) =>
    isSelected ? `background-color:${theme.palette.accent2}` : ""};
  :hover {
    ${({ isSelected }) =>
      !isSelected ? `background-color:${theme.palette.accent}` : ""};
  }
  & > * {
    margin-left: 10px;
  }
`;

export default ListItem;
