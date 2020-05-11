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

const Search: React.FC = () => {
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
      検索
      <Content>
        <SearchBar
          value={searchText}
          onChange={handleChange}
          onClick={() => {
            console.log(searchText);
          }}
        />
      </Content>
    </Wrapper>
  );
};

export default Search;
