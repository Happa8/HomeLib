import * as React from "react";
import styled from "styled-components";

import TopControl from "../molecule/TopControl";
import Page from "../template/page";

const Wrapper = styled.div`
  width: 100%;
`;

const Home = () => {
  return (
    <Page title="HOME">
      <TopControl />
    </Page>
  );
};

export default Home;
