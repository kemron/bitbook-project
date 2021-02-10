import styled from "@emotion/styled";
import theme from "./theme";

const Button = styled.button`
  padding: 0px 8px;
  text-align: center;
  position: relative;
  line-height: 22px;
  font-size: 18px;
  margin-left: 2px;
  cursor: pointer;
  border: none;
  text-decoration: none;
  background: ${theme.palette.accent2};
  color: #ffffff;

  &:hover {
    background: #0098cd;
  }
`;

export default Button;
