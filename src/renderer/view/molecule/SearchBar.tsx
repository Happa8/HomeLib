import * as React from "react";
import styled from "styled-components";

import Button from "../atom/InputButton";
import Input from "../atom/InputForm";

type Props = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  border-radius: 4px;
  overflow: hidden;
  input {
    flex: 1;
  }
`;

const SearchBar: React.FC<Props> = (props) => {
  return (
    <Wrapper>
      <Input name="search" value={props.value} onChange={props.onChange} />
      <Button onClick={props.onClick}>検索</Button>
    </Wrapper>
  );
};

export default SearchBar;
