import * as React from "react";
import styled from "styled-components";

import LogoType from "../../assets/LogoType.svg";

const Wrapper = styled.div`
  width: 100%;
  height: 10px;
`;

const Navigator = () => {
  return (
    <Wrapper>
      <img src={LogoType} />
    </Wrapper>
  );
};

export default Navigator;
