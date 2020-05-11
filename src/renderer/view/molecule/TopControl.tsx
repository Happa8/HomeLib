import * as React from "react";
import styled from "styled-components";
import { withRouter, RouteComponentProps } from "react-router-dom";

import TopButton from "../atom/TopButton";

const Wrapper = styled.div`
  width: 90%;
  height: 100%;
  margin: 0 5%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  div {
    margin: 10px;
  }
`;

const TopControl: React.FC<RouteComponentProps> = (props) => {
  const handleChangePage = (address: string) => {
    props.history.push(address);
  };
  return (
    <Wrapper>
      <TopButton
        onClick={() => {
          handleChangePage("/search");
        }}
      >
        検索
      </TopButton>
      <TopButton
        onClick={() => {
          handleChangePage("/touroku");
        }}
      >
        登録
      </TopButton>
      <TopButton
        onClick={() => {
          handleChangePage("/kashidashi");
        }}
      >
        貸出
      </TopButton>
      <TopButton
        onClick={() => {
          handleChangePage("/henkyaku");
        }}
      >
        返却
      </TopButton>
    </Wrapper>
  );
};

export default withRouter(TopControl);
