import * as React from "react";
import styled from "styled-components";

import SearchBar from "../molecule/SearchBar";

const Wrapper = styled.div`
  padding: 20px;
  width: 100%;
`;

const Content = styled.div`
  margin-left: 10%;
  width: 80%;
`;

const Search = () => {
  return (
    <Wrapper>
      検索
      <Content>
        <SearchBar />
      </Content>
    </Wrapper>
  );
};

export default Search;
