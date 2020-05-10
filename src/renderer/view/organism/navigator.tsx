import * as React from "react";
import styled from "styled-components";

import LogoType from "../../../assets/LogoType.svg";
import Logo from "../../../assets/Logo.svg";
import NavControl from "../molecule/NavControl";

import COLOR from "../../../util/color";

const Wrapper = styled.div`
  width: 280px;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-color: ${COLOR.GLAY};
`;

const SeparateBar = styled.div`
  width: 60%;
  height: 1px;
  margin: 40px 20%;
  background-color: ${COLOR.BLACK};
`;

const LogoWrapper = styled.div`
  width: 100%;
  svg {
    width: 100%;
  }
`;

const Navigator = () => {
  return (
    <Wrapper>
      <LogoWrapper>
        <LogoType />
      </LogoWrapper>
      <SeparateBar />
      <NavControl />
    </Wrapper>
  );
};

export default Navigator;
