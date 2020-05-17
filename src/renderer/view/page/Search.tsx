import * as React from "react";
import styled from "styled-components";
import useSearchBooks from "../../../hooks/useSearchBooks";

import SearchBar from "../molecule/SearchBar";
import { Book } from "../../../util/searchBook";
import ResultItem from "../molecule/ResultItem";
import { Props as ResultProps } from "../atom/ResultColumn";
import Page from "../template/page";

const Wrapper = styled.div`
  padding: 20px;
  width: 100%;
`;

const Content = styled.div`
  margin-left: 10%;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ResItem = styled(ResultItem)`
  margin: 40px 0;
`;

const Search: React.FC = () => {
  const [searchText, setSearchText] = React.useState("");
  const [query, setQuery] = React.useState<string>("");
  const { book, status } = useSearchBooks(query);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case "search":
        setSearchText(event.target.value);
        break;
    }
  };

  const handleClick = () => {
    setQuery(searchText);
  };

  const setDisplayData = (data: Book): ResultProps[] => {
    const res: ResultProps[] = [];
    res.push({ label: "ISBN", content: data.ISBN.toString() });
    res.push({ label: "著者", content: data.authors?.toString() });
    res.push({ label: "出版社", content: data.publisher });
    res.push({ label: "出版年月日", content: data.publishedYear.toString() });
    res.push({ label: "説明", content: data.description });
    console.log(res);
    return res;
  };

  return (
    <Page title="検索">
      <SearchBar
        value={searchText}
        onChange={handleChange}
        onClick={() => {
          console.log(searchText);
          handleClick();
        }}
      />
      {status === "loaded" ? (
        <ResItem title={book.title} contents={setDisplayData(book)} />
      ) : (
        <div>Now Loading...</div>
      )}
    </Page>
  );
};

export default Search;
