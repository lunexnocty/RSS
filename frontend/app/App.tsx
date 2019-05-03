import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  background-color: "#fff";
  align-items: "center";
  justify-content: "center";
`;

export default class App extends React.Component {
  render() {
    return (
      <Container>
        <Text>A Radiation Supervision System</Text>
      </Container>
    );
  }
}
