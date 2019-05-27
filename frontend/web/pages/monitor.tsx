import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Router from 'next/router';
import Layout, { Flex } from '../components/layout';
import api, {
  RSTResponse,
  SourceResponse,
  StateResponse
} from '../shared/api/search';
import ErrorInfo from '../components/errorInfo';
import Table, { Row, Cell } from '../components/table';

const FlexWarpper = styled(Flex)`
  width: 80%;
  margin: 2rem auto;
`;
const RSTWrapper = styled.ul`
  border-radius: 10px;
  width: 40%;
  border: 0;
  padding: 5px 10px;
  text-align: left;
  background-color: #eee;
`;
const RST = ({ data }: RSTResponse) => {
  return (
    <RSTWrapper>
      <li>RST: {data.id} </li>
      <li>状态: {data.name} </li>
      <li>锁状态: {data.enable} </li>
      <li>更新时间: {data.update_time} </li>
    </RSTWrapper>
  );
};

const Source = ({ data }: SourceResponse) => {
  return (
    <RSTWrapper>
      <li>放射源名字: {data.name} </li>
      <li>状态: {data.enable} </li>
    </RSTWrapper>
  );
};
const Error = styled(ErrorInfo)`
  text-align: center;
  margin: 0 auto;
  margin-top: 2rem;
`;

const ID = styled.input`
  text-align: center;
  margin-top: 1rem;
  width: 10rem;
  border: none;
  border-bottom: 2px solid #ccc;
  padding: 5px;
  &:focus {
    outline: none;
    border-bottom: 2px solid skyblue;
  }
`;

type IDFormProps = {
  shrink: boolean;
};

const IDForm = styled.form<IDFormProps>`
  margin: 0 auto;
  width: 80%;
  text-align: ${props => (props.shrink ? 'left' : 'center')};
  ${ID} {
    font-size: ${props => (props.shrink ? '1rem' : '2rem')};
    width: ${props => (props.shrink ? '5rem' : '10rem')};
  }
`;
type DisplayProps = {
  rows: StateResponse[];
};
const Display = ({ rows }: DisplayProps) => {
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
};

export default function Monitor() {
  const init: StatusResponse = {
    rst: {},
    source: {},
    state: [{}]
  };

  const [showInput, setShowInout] = useState(true);
  const [info, setInfo] = useState('');
  const [res, setRes] = useState(init);
  const [stateHistory, setStateHistory] = useState<State>([]);

  let urlId: string = '';

  const getID = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
  };

  const checkID = (id: string) => {
    const num = parseInt(id);
    return num && !isNaN(num);
  };

  if (process.browser) {
    urlId = getID();
  }

  const [id, setID] = useState(urlId);

  useEffect(() => {
    const getData = async () => {
      const data = await api.search(id);
      if (data.status !== 300) {
        setInfo(data.error);
        setRes(init);
        setStateHistory([]);
        return;
      }
      setInfo('');
      setRes(data);
      if (data.state) {
        setStateHistory([data.state, ...stateHistory]);
      }
    };
    if (checkID(id)) {
      getData();
    }
  }, [id]);

  const navigate = (id: string) => {
    if (checkID(id)) {
      let params = new URLSearchParams(window.location.search);
      params.set('id', id);
      const url = window.location.pathname + '?' + params.toString();
      Router.replace(url);
      setID(id);
    }
  };

  const handleSearch = e => {
    e.preventDefault();
    const [_, input] = e.target.children;
    navigate(input.value);
  };

  const hasData = Object.keys(res.rst).length !== 0;

  console.log(res);

  return (
    <Layout>
      <>
        <h1>监控</h1>
        {showInput && (
          <IDForm shrink={hasData} onSubmit={handleSearch}>
            <label htmlFor="searchID">ID: </label>
            <ID placeholder={id} id="searchID" type="text" />
          </IDForm>
        )}
        {info && <Error>{info}</Error>}
        {hasData && (
          <>
            <FlexWarpper>
              <RST data={res.rst} />
              <Source data={res.source} />
            </FlexWarpper>
            <Display rows={stateHistory} />
          </>
        )}
      </>
    </Layout>
  );
}
