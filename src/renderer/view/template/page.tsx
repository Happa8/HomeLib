import * as React from "react";
import styled from "styled-components";

import COLOR from "../../../util/color";

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
  /* align-items: center; */
`;

const Title = styled.div`
  width: 100%;
  border-bottom: 1px solid ${COLOR.BLACK};
  p {
    margin-left: 10px;
    color: ${COLOR.BLACK};
    font-size: 2rem;
    font-weight: bold;
  }
  margin-bottom: 20px;
  padding-bottom: 10px;
  box-sizing: border-box;
`;

const Page: React.FC<Props> = (props) => {
  return (
    <Wrapper>
      <Title>
        <p>{props.title}</p>
      </Title>
      <Content>{props.children}</Content>
    </Wrapper>
  );
};

export default Page;
