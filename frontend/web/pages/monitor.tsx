import { useState, useEffect } from "react";
import styled from "styled-components";
import Router from "next/router";
import Layout, { Flex } from "../components/layout";
import api, { SearchResponse, SourceResponse } from "../shared/api/search";
import Monitor from "../components/monitor/index";
import ErrorInfo from "../components/errorInfo";

const FlexWarpper = styled(Flex)`
  width: 80%;
  margin: 2rem auto;
`;

const Error = styled(ErrorInfo)`
  text-align: center;
  margin: 0 auto;
  margin-top: 2rem;
`;

const ID = styled.input`
  transition: all 0.6s ease-in-out;
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
  transition: all 0.6s ease-in-out;
  margin-left: 10%;
  text-align: center;
  width: ${props => (props.shrink ? "fit-content" : "80%")};
  ${ID} {
    font-size: ${props => (props.shrink ? "1rem" : "2rem")};
    width: ${props => (props.shrink ? "5rem" : "10rem")};
  }
`;
export default function MonitorPage() {
  const init: SearchResponse = {
    rst: {},
    source: {},
    state: [{}]
  };

  const [info, setInfo] = useState("");
  const [res, setRes] = useState(init);
  const [stateHistory, setStateHistory] = useState<SourceResponse>([]);

  let urlId: string = "";

  const getID = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
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
      setInfo("");
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
      params.set("id", id);
      const url = window.location.pathname + "?" + params.toString();
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

        <IDForm shrink={hasData} onSubmit={handleSearch}>
          <label htmlFor="searchID">ID: </label>
          <ID placeholder={id} id="searchID" type="text" />
        </IDForm>

        {info && <Error>{info}</Error>}
        {hasData && (
          <>
            <FlexWarpper>
              <Monitor.RST data={res.rst} />
              <Monitor.Source data={res.source} />
            </FlexWarpper>
            <Monitor.Display rows={stateHistory} />
            <Monitor.Map
              coordinate={
                stateHistory.length ? stateHistory[0].coordinate : null
              }
            />
          </>
        )}
      </>
    </Layout>
  );
}
