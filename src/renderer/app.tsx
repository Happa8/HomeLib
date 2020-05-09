import * as React from "react";
import * as ReactDOM from "react-dom";
import styled from "styled-components";

import GlobalStyle from "../util/globalStyle";
import Navigator from "./view/organism/navigator";

const container = document.getElementById("app");

const Main = styled.main`
  width: 100vw;
  height: 100vh;
`;

const App: React.FC = () => {
  return (
    <Main>
      <GlobalStyle />
      <Navigator />
    </Main>
  );
};

ReactDOM.render(<App />, container);
