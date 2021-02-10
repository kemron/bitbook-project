import styled from "@emotion/styled";

interface RowProps {
  columns?: number;
}

const Row = styled.div<RowProps>`
  display: grid;
  overflow: hidden;
  grid-template-columns: repeat(${({ columns }) => columns ?? 3}, 1fr);
  grid-template-rows: auto;
  width: 100%;
  position: sticky;
  text-align: center;
`;

export default Row;
