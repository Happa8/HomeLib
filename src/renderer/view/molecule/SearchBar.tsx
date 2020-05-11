import * as React from "react";
import styled from "styled-components";

import Button from "../atom/InputButton";
import Input from "../atom/InputForm";

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

const SearchBar: React.FC = () => {
  const [searchText, setSearchText] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case "search":
        setSearchText(event.target.value);
        break;
    }
  };
  return (
    <Wrapper>
      <Input name="search" value={searchText} onChange={handleChange} />
      <Button>検索</Button>
    </Wrapper>
  );
};

export default SearchBar;
