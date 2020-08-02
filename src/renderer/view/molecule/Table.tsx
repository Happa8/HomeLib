import * as React from "react";
import styled from "styled-components";
import COLOR from "../../../util/color";

type Props = {
  header?: string[];
  contents: any[][];
  style?: React.CSSProperties;
};

const Wrapper = styled.div`
  width: 400px;
`;

const Tableb = styled.table`
  width: 100%;
  border-collapse: collapse;
  tr {
    /* border-top: 1px solid ${COLOR.BLACK}; */
    &:first-child {
      border-top: none;
    }
    &:nth-child(2n) {
      background-color: ${COLOR.GLAY};
    }
  }
`;

const TRow = styled.tr`
  height: 3rem;
`;

const THeader = styled.th`
  vertical-align: middle;
  text-align: center;
`;

const TCell = styled.td`
  color: ${COLOR.BLACK};
  vertical-align: middle;
  text-align: center;
`;

const header = (headerData: string[]) => {
  if (headerData != undefined) {
    return (
      <TRow>
        {headerData.map((contents) => (
          <THeader>{contents}</THeader>
        ))}
      </TRow>
    );
  } else {
    return undefined;
  }
};

const contents = (contents: any[][]) => {
  return contents.map((content) => {
    const cell = content.map((data) => <TCell>{data}</TCell>);
    return <TRow>{cell}</TRow>;
  });
};

const Table: React.FC<Props> = (props) => {
  return (
    <Wrapper style={props?.style}>
      <Tableb>
        {header(props?.header)}
        {contents(props.contents)}
      </Tableb>
    </Wrapper>
  );
};

export default Table;
