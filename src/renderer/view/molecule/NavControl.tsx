import * as React from "react";
import styled from "styled-components";
import { withRouter, RouteComponentProps } from "react-router-dom";

import NavButton from "../atom/NavButton";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  div {
    margin: 0 auto 40px auto;
  }
`;

const NavControl: React.FC<RouteComponentProps> = (props) => {
  const handleChangePage = (address: string) => {
    props.history.push(address);
  };
  return (
    <Wrapper>
      <NavButton
        onClick={() => {
          handleChangePage("/search");
        }}
      >
        検索
      </NavButton>
      <NavButton
        onClick={() => {
          handleChangePage("/touroku");
        }}
      >
        登録
      </NavButton>
      <NavButton
        onClick={() => {
          handleChangePage("/kashidashi");
        }}
      >
        貸出
      </NavButton>
      <NavButton
        onClick={() => {
          handleChangePage("/henkyaku");
        }}
      >
        返却
      </NavButton>
    </Wrapper>
  );
};

export default withRouter(NavControl);
