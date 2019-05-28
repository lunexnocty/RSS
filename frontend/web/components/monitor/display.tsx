import { StateResponse } from "../../shared/api/search";

import Table, { Row, Cell } from '../table';

type DisplayProps = {
  rows: StateResponse[];
};

export default function Display({ rows }: DisplayProps) {
  return (
    <Table>
      <thead>
        <Row>
          <th>status</th>
          <th>ID</th>
          <th>活度</th>
          <th>电量</th>
          <th>状态</th>
          <th>获取时间</th>
        </Row>
      </thead>
      <tbody>
        {rows.map((state, i) => (
          <Row key={`r-${i}`}>
            <Cell>{state.radiation_status}</Cell>
            <Cell>{state.id}</Cell>
            <Cell>{state.activity}</Cell>
            <Cell>{state.battery}</Cell>
            <Cell>{state.terminal_status}</Cell>
            <Cell>{state.update_time}</Cell>
          </Row>
        ))}
      </tbody>
    </Table>
  );
}


