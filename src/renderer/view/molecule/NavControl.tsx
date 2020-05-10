import * as React from "react";
import styled from "styled-components";

import NavButton from "../atom/NavButton";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  div {
    margin: 0 auto 40px auto;
  }
`;

const NavControl = () => {
  return (
    <Wrapper>
      <NavButton
        onClick={() => {
          console.log("検索");
        }}
      >
        検索
      </NavButton>
      <NavButton
        onClick={() => {
          console.log("登録");
        }}
      >
        登録
      </NavButton>
      <NavButton
        onClick={() => {
          console.log("貸出");
        }}
      >
        貸出
      </NavButton>
      <NavButton
        onClick={() => {
          console.log("返却");
        }}
      >
        返却
      </NavButton>
    </Wrapper>
  );
};

export default NavControl;
