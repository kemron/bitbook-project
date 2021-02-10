import styled from "@emotion/styled";
import theme from "atoms/theme";
const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  border-left: 1px solid ${theme.palette.accent};
`;

export default Sidebar;
