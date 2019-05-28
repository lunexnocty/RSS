import { RSTResponse } from "../../shared/api/search";
import Wrapper from './wrapper'

type RSTProps = {
    data: RSTResponse
}

export default function RST({ data }: RSTProps) {
    return (
      <Wrapper>
        <li>RST: {data.id} </li>
        <li>状态: {data.name} </li>
        <li>锁状态: {data.enable} </li>
        <li>更新时间: {data.update_time} </li>
      </Wrapper>
    );
  };