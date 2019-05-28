import { SourceResponse } from "../../shared/api/search";
import Wrapper from './wrapper'

type SourceProps = {
    data: SourceResponse
}

export  default function Source({ data }: SourceProps) {
    return (
      <Wrapper>
        <li>放射源名字: {data.name} </li>
        <li>状态: {data.enable} </li>
      </Wrapper>
    );
  };