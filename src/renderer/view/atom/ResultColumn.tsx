import * as React from "react";
import styled from "styled-components";

import COLOR from "../../../util/color";

export type Props = {
  label: string;
  content: any;
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  margin: 10px 0;
  height: max-content;
  margin-top: 20px;
`;

const Label = styled.div`
  width: 100px;
  font-size: 0.9rem;
`;
const Content = styled.div`
  flex: 1;
  line-height: 1.4rem;
  font-size: 0.9rem;
  border-left: 1px solid ${COLOR.BLACK};
  padding-left: 15px;
  padding-bottom: 0.1rem;
  min-height: 1rem;
`;
const SeparateBar = styled.div`
  width: 1px;
  height: 100%;
  background-color: ${COLOR.BLACK};
  margin: 0 10px;
`;

const ResultColumn: React.FC<Props> = (props) => {
  return (
    <Wrapper>
      <Label>{props.label}</Label>
      <SeparateBar />
      <Content>{props.content}</Content>
    </Wrapper>
  );
};

export default ResultColumn;
