import { useState, useEffect, useContext } from 'react';
import Router from 'next/router';
import Layout from '../components/layout/';
import Pagination from '../components/pagination';
import Table, { Row, Cell } from '../components/table';
import Availability from '../components/status';
import Swal from 'sweetalert2';
import api, { Source } from '../shared/api/source';
import { LoginContext } from '../context/login';

export default function Index() {
  const [sources, setSources] = useState<Source[]>([]);
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState(false);
  const isLoggedIn = useContext(LoginContext);

  useEffect(() => {
    const getSources = async () => {
      const enable = filter ? 1 : -1;
      const res = await api.search({ page, enable });
      if (res.status === 401) {
        Swal.fire({ text: '没有更多数据', heightAuto: false });
        setPage(page - 1);
      } else if (res.status !== 400) {
        Swal.fire({
          type: 'error',
          title: '出错了',
          text: res.error,
          heightAuto: false
        });
        return;
      } else {
        // @ts-ignore
        setSources(res.rst);
      }
    };
    if (isLoggedIn) {
      getSources();
    }
  }, [page, filter, isLoggedIn]);

  const changePage = (action: string) => {
    if (action === 'forth') {
      setPage(page + 1);
    } else {
      if (page === 0) {
        return;
      }
      setPage(page - 1);
    }
  };

  const handleClick = id => {
    Router.replace(id ? `/monitor?id=${id}` : '/monitor');
  };

  return (
    <Layout>
      <>
        <h1>放射源查询</h1>
        <Pagination current={page} changeOffset={changePage} />
        <Table>
          <thead>
            <Row>
              <th style={{ width: '10%' }}>RST ID</th>
              <th style={{ width: '25%' }}>名称</th>
              <th style={{ width: '10%' }}>放射源ID</th>
              <th style={{ width: '15%' }}>
                可用性
                <input
                  style={{
                    marginLeft: '10px'
                  }}
                  type="checkbox"
                  onChange={e => setFilter(e.target.checked)}
                />
              </th>
              <th style={{ width: '30%' }}>更新时间</th>
            </Row>
          </thead>
          <tbody>
            {sources.map((source, i) => (
              <Row
                onClick={() => handleClick(source.source_id)}
                key={`s-${i}`}
                sourceID={source.source_id}
              >
                <Cell>{source.id}</Cell>
                <Cell>{source.name}</Cell>
                <Cell>{source.source_id}</Cell>
                <Cell>
                  <Availability availabile={source.enable} />
                </Cell>
                <Cell>{source.update_time}</Cell>
              </Row>
            ))}
          </tbody>
        </Table>
        <Pagination current={page} changeOffset={changePage} />
      </>
    </Layout>
  );
}
