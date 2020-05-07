import * as React from "react";
import * as ReactDOM from "react-dom";
import styled from "styled-components";

import GlobalStyle from "./components/globalStyle";

const container = document.getElementById("app");

const Main = styled.main`
  width: 100vw;
  height: 100vh;
`;

const App: React.FC = () => {
  return (
    <Main>
      <GlobalStyle />
      Hello, world!
    </Main>
  );
};

ReactDOM.render(<App />, container);
