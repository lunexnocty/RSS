import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Layout from "../components/layout/";
import Pagination from "../components/pagination";
import Swal from "sweetalert2";
import api, { Source } from "../shared/api/source";
import { LoginContext } from "../context/login";
type AvailabilityProps = {
  availabile: boolean;
};

const Table = styled.table`
  margin: 1rem auto;
  width: 95%;
  table-layout: fixed;
  border-collapse: collapse;
`;

const Row = styled.tr`
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;
  &:hover {
    background-color: #eee;
  }
`;
const Cell = styled.td`
  padding: 10px;
`;

const Availability = styled.span<AvailabilityProps>`
  font-family: sans-serif;
  font-weight: bold;
  padding: 5px 1rem;
  border-radius: 5px;
  color: #fff;
  background-color: ${props => (props.availabile ? "#9ccc65" : "#e91e63")};
`;

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
        Swal.fire({ text: "没有更多数据", heightAuto: false });
        setPage(page - 1);
      } else if (res.status !== 400) {
        Swal.fire({
          type: "error",
          title: "出错了",
          text: res.error,
          heightAuto: false
        });
        setPage(page - 1);
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
    if (action === "forth") {
      setPage(page + 1);
    } else {
      if (page === 0) {
        return;
      }
      setPage(page - 1);
    }
  };

  return (
    <Layout>
      <>
        <h1>放射源查询</h1>
        <Pagination current={page} changeOffset={changePage} />
        <Table>
          <thead>
            <Row>
              <th style={{ width: "10%" }}>RST ID</th>
              <th style={{ width: "25%" }}>名称</th>
              <th style={{ width: "10%" }}>放射源ID</th>
              <th style={{ width: "15%" }}>
                可用性
                <input
                  style={{
                    marginLeft: "10px"
                  }}
                  type="checkbox"
                  onChange={e => setFilter(e.target.checked)}
                />
              </th>
              <th style={{ width: "30%" }}>更新时间</th>
            </Row>
          </thead>
          <tbody>
            {sources.map((source, i) => (
              <Row key={`s-${i}`}>
                <Cell>{source.id}</Cell>
                <Cell>{source.name}</Cell>
                <Cell>{source.source_id}</Cell>
                <Cell>
                  <Availability availabile={source.enable}>
                    {source.enable ? "✔" : "X"}
                  </Availability>
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
