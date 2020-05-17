import * as React from "react";
import * as ReactDOM from "react-dom";
import styled from "styled-components";
import { HashRouter, Route, Switch, Link } from "react-router-dom";

import GlobalStyle from "../util/globalStyle";
import Navigator from "./view/organism/Navigator";

import Home from "./view/page/Home";
import Search from "./view/page/Search";
import Touroku from "./view/page/Touroku";
import Kashidashi from "./view/page/Kashidashi";
import Henkyaku from "./view/page/Henkyaku";

const container = document.getElementById("app");

const Main = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  overflow: hidden;
`;

const App: React.FC = () => {
  return (
    <Main>
      <HashRouter>
        <GlobalStyle />
        <Navigator />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/search" component={Search} />
          <Route path="/touroku" component={Touroku} />
          <Route path="/kashidashi" component={Kashidashi} />
          <Route path="/henkyaku" component={Henkyaku} />
        </Switch>
      </HashRouter>
    </Main>
  );
};

ReactDOM.render(<App />, container);
