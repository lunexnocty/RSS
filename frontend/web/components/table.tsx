import styled from 'styled-components';

export const Table = styled.table`
  margin: 1rem auto;
  width: 95%;
  table-layout: fixed;
  border-collapse: collapse;
`;

export const Row = styled.tr`
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;
  &:hover {
    background-color: #eee;
  }
`;

export const Cell = styled.td`
  padding: 10px;
`;

export default Table;
