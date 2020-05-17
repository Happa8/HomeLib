import * as React from "react";
import styled from "styled-components";

type Props = {
  title: string;
};

const Wrapper = styled.div`
  padding: 20px;
  width: 100%;
  overflow: auto;
`;

const Content = styled.div`
  margin-left: 10%;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Page: React.FC<Props> = (props) => {
  return (
    <Wrapper>
      {props.title}
      <Content>{props.children}</Content>
    </Wrapper>
  );
};

export default Page;
