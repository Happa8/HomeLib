import * as React from "react";
import * as ReactDOM from "react-dom";
import styled from "styled-components";
import { HashRouter, Route, Switch, Link } from "react-router-dom";

import GlobalStyle from "../util/globalStyle";
import Navigator from "./view/organism/Navigator";
import Home from "./view/page/Home";

const container = document.getElementById("app");

const Main = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
`;

const App: React.FC = () => {
  return (
    <Main>
      <GlobalStyle />
      <Navigator />
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </HashRouter>
    </Main>
  );
};

ReactDOM.render(<App />, container);
