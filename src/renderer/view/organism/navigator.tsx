import * as React from "react";
import styled from "styled-components";

import LogoType from "../../../assets/LogoType.svg";

const Wrapper = styled.div`
  width: 100%;
  height: 10px;
`;

const LogoWrapper = styled.div`
  height: 80px;
  svg {
    height: 100%;
    margin: 20px;
  }
`;

const Navigator = () => {
  return (
    <Wrapper>
      <LogoWrapper>
        <LogoType />
      </LogoWrapper>
    </Wrapper>
  );
};

export default Navigator;
