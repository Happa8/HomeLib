import * as React from "react";
import styled from "styled-components";

import TopControl from "../molecule/TopControl";

const Wrapper = styled.div`
  width: 100%;
`;

const Home = () => {
  return (
    <Wrapper>
      <TopControl />
    </Wrapper>
  );
};

export default Home;
