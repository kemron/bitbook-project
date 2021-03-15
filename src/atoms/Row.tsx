import styled from "@emotion/styled";

interface RowProps {
  columns?: number;
}

const DEFAULT_COLS = 3;

const Row = styled.div<RowProps>`
  display: grid;
  overflow: hidden;
  grid-template-columns: repeat(
    ${({ columns }) => columns ?? DEFAULT_COLS},
    1fr
  );
  width: 100%;
  text-align: center;
`;

export default Row;
