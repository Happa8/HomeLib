import * as React from "react";
import styled from "styled-components";
import { Props as ResultProps } from "../atom/ResultColumn";
import ResultColumn from "../atom/ResultColumn";

import COLOR from "../../../util/color";

type Props = {
  title: string;
  contents: ResultProps[];
  className?: string;
};

const Wrapper = styled.div`
  width: 80%;
  box-sizing: border-box;
  padding: 20px 40px;
  background-color: ${COLOR.GLAY};
  color: ${COLOR.BLACK};
  border-radius: 7px;
`;

const Title = styled.div`
  width: 105%;
  margin-left: -2.5%;
  padding-left: 2.5%;
  border-bottom: 1px solid ${COLOR.BLACK};
  padding-bottom: 10px;
  box-sizing: border-box;
  font-size: 1.5rem;
  font-weight: bold;
`;

const ResultItem: React.FC<Props> = (props) => {
  return (
    <Wrapper className={props.className}>
      <Title>{props.title}</Title>
      {props.contents.map((elm) => (
        <ResultColumn label={elm.label} content={elm.content} key={elm.label} />
      ))}
    </Wrapper>
  );
};

export default ResultItem;
