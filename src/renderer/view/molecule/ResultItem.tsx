import * as React from "react";
import styled from "styled-components";
import { Props as ResultProps } from "../atom/ResultColumn";
import ResultColumn from "../atom/ResultColumn";
import Button from "../atom/Button";
import COLOR from "../../../util/color";
import { Link } from "react-router-dom";

type Props = {
  title: string;
  id: string;
  contents: ResultProps[];
  className?: string;
};

const Wrapper = styled.div`
  width: 100%;
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

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ResultItem: React.FC<Props> = (props) => {
  const linkaddress = "/book/edit/" + props.id;
  return (
    <Wrapper className={props.className}>
      <Title>{props.title}</Title>
      {props.contents.map((elm) => (
        <ResultColumn label={elm.label} content={elm.content} key={elm.label} />
      ))}
      <Buttons>
        <Link to={linkaddress}>
          <Button>更新</Button>
        </Link>
      </Buttons>
    </Wrapper>
  );
};

export default ResultItem;
