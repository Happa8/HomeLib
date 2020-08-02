import * as React from "react";
import { useState } from "react";
import styled from "styled-components";
import useSearchBooks from "../../../hooks/useSearchBooks";
import { Link } from "react-router-dom";
import { Like } from "typeorm";

import SearchBar from "../molecule/SearchBar";
import { Book } from "../../../util/searchBook";
import ResultItem from "../molecule/ResultItem";
import { Props as ResultProps } from "../atom/ResultColumn";
import Page from "../template/page";
import useDB, { Query } from "../../../hooks/useBookDB";
import BookEntity from "../../../entity/Book";
import Table from "../molecule/Table";
import Button from "../atom/Button";
import MInput from "../organism/MultipulInput";
import { Props as InputProps } from "../molecule/InputWithLabel";

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
  margin-top: 20px;
`;

const PageController = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

const PageData = styled.div`
  margin: 0 20px;
`;

const ButtonArea = styled.div`
  right: 0;
  display: flex;
  justify-content: flex-end;
  margin-right: -10px;
  margin-top: 10px;
  div {
    margin-right: 10px;
  }
`;

const Search: React.FC = () => {
  const [searchText, setSearchText] = React.useState("");
  const [pageNum, setPageNum] = React.useState<number>(1);
  const [onePageColumnNum, setOnePageColumnNum] = React.useState<number>(13);
  const [query, setQuery] = React.useState<Query>({
    mode: "get",
    table: "book",
    query: {},
    andor: "AND",
    options: {
      take: onePageColumnNum,
      skip: 0,
      order: {
        title: "ASC",
      },
    },
  });
  const [searcherMode, setSearcherMode] = useState<"EASY" | "EX">("EASY");
  // const { book, status } = useSearchBooks(query);
  const { res, status, count } = useDB(query);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case "search":
        setSearchText(event.target.value);
        break;
    }
  };

  const handleClickEasySearch = () => {
    setQuery({
      mode: "get",
      table: "book",
      query: [
        {
          title: searchText,
        },
        {
          creators: [{ name: searchText }],
        },
        {
          isbn: parseInt(searchText),
        },
      ],
      andor: "OR",
      options: {
        take: onePageColumnNum,
        skip: 0,
        order: {
          title: "ASC",
        },
      },
    });
  };

  const changePage = (pageNum: number) => {
    let tmpQuery = { ...query };
    if (tmpQuery.mode == "get") {
      tmpQuery.options = {
        take: onePageColumnNum,
        skip: onePageColumnNum * (pageNum - 1),
        order: {
          title: "ASC",
        },
      };
    }
    setQuery(tmpQuery);
    console.log(query);
    setPageNum(pageNum);
  };

  const reselm = (res: BookEntity[]) => {
    if (res.length > 0) {
      const theader: string[] = ["タイトル", "著者名", ""];
      let tcontents: any[][] = [];
      const maxPageNum = Math.ceil(count / onePageColumnNum);
      res.map((resdata) => {
        tcontents.push([
          resdata.title,
          resdata.creators.map((creator) => creator.name),
          <Link to={"/book/detail/" + resdata.id}>
            <Button size="mini" style={{ width: "35px" }}>
              詳細
            </Button>
          </Link>,
        ]);
      });
      return (
        <div>
          <Table header={theader} contents={tcontents} style={TableStyle} />
          <PageController>
            {pageNum === 1 ? (
              <div style={{ width: "80px", height: "1px" }} />
            ) : (
              <Button
                theme={"reversed"}
                style={{ width: "40px" }}
                onClick={() => changePage(pageNum - 1)}
              >
                Pre
              </Button>
            )}
            <PageData>{pageNum + " / " + maxPageNum}</PageData>
            {pageNum === maxPageNum ? (
              <div style={{ width: "80px", height: "1px" }} />
            ) : (
              <Button
                theme={"reversed"}
                style={{ width: "40px" }}
                onClick={() => changePage(pageNum + 1)}
              >
                Next
              </Button>
            )}
          </PageController>
        </div>
      );
    } else {
      return <div>No Data.</div>;
    }
  };

  const [sBookTitle, setSBookTitle] = useState("");
  const [sBookISBN, setSBookISBN] = useState("");
  const [sBookAuthor, setSBookAuthor] = useState("");
  const [sBookPublisher, setSBookPublisher] = useState("");
  const [sBookPubYear, setSBookPubYear] = useState("");
  const [sAndOr, setSAndOr] = useState<"AND" | "OR">("AND");

  const handleChangeExSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case "title":
        setSBookTitle(event.target.value);
        break;
      case "isbn":
        setSBookISBN(event.target.value);
        break;
      case "authors":
        setSBookAuthor(event.target.value);
        break;
      case "publisher":
        setSBookPublisher(event.target.value);
        break;
      case "pubyear":
        setSBookPubYear(event.target.value);
        break;
    }
  };

  const SearchExInputData: InputProps[] = [
    {
      name: "title",
      label: "タイトル",
      type: "text",
      input: {
        value: sBookTitle,
        onChange: handleChangeExSearch,
      },
    },
    {
      name: "isbn",
      label: "ISBN",
      type: "text",
      input: {
        value: sBookISBN,
        onChange: handleChangeExSearch,
      },
    },
    {
      name: "authors",
      label: "著者",
      type: "text",
      input: {
        value: sBookAuthor,
        onChange: handleChangeExSearch,
      },
    },
    {
      name: "publisher",
      label: "出版社",
      type: "text",
      input: {
        value: sBookPublisher,
        onChange: handleChangeExSearch,
      },
    },
    {
      name: "pubyear",
      label: "出版年",
      type: "text",
      input: {
        value: sBookPubYear,
        onChange: handleChangeExSearch,
      },
    },
    {
      name: "andor",
      label: "AND/OR",
      type: "radio",
      input: {
        data: [
          {
            label: "AND",
            value: "AND",
          },
          {
            label: "OR",
            value: "OR",
          },
        ],
        valueSetter: setSAndOr,
        value: sAndOr,
      },
    },
  ];

  const handleClickExSearch = () => {
    if (sAndOr == "AND") {
      setQuery({
        mode: "get",
        table: "book",
        query: [
          {
            title: sBookTitle,
          },
          {
            creators: [{ name: sBookAuthor }],
          },
          {
            isbn: parseInt(sBookISBN),
          },
          {
            publisher: { name: sBookPublisher },
          },
          {
            pubYear: parseInt(sBookPubYear),
          },
        ],
        andor: "AND",
        options: {
          take: onePageColumnNum,
          skip: 0,
          order: {
            title: "ASC",
          },
        },
      });
    } else {
      setQuery({
        mode: "get",
        table: "book",
        query: [
          {
            title: sBookTitle,

            creators: [{ name: sBookAuthor }],

            isbn: parseInt(sBookISBN),

            publisher: { name: sBookPublisher },

            pubYear: parseInt(sBookPubYear),
          },
        ],
        andor: "OR",
        options: {
          take: onePageColumnNum,
          skip: 0,
          order: {
            title: "ASC",
          },
        },
      });
    }
  };

  const clearExSearch = () => {
    setSBookTitle("");
    setSBookISBN("");
    setSBookAuthor("");
    setSBookPublisher("");
    setSBookPubYear("");
  };

  const TableStyle: React.CSSProperties = {
    width: "100%",
    marginTop: "20px",
  };

  const Searcher = (mode: "EASY" | "EX") => {
    if (mode == "EASY") {
      return (
        <div>
          <SearchBar
            value={searchText}
            onChange={handleChange}
            onClick={() => {
              console.log(searchText);
              handleClickEasySearch();
            }}
          />
          <ButtonArea>
            <Button
              theme="reversed"
              onClick={() => {
                setSearcherMode("EX");
              }}
            >
              詳細検索に切り替え
            </Button>
          </ButtonArea>
        </div>
      );
    } else {
      return (
        <div>
          <MInput InputProps={SearchExInputData} />
          <ButtonArea>
            <Button
              theme="reversed"
              onClick={() => {
                setSearcherMode("EASY");
              }}
            >
              簡易検索に切り替え
            </Button>
            <Button
              theme="reversed"
              onClick={() => {
                clearExSearch();
              }}
            >
              クリア
            </Button>
            <Button onClick={() => handleClickExSearch()}>検索</Button>
          </ButtonArea>
        </div>
      );
    }
  };

  return (
    <Page title="検索">
      {Searcher(searcherMode)}

      {status === "loaded" ? reselm(res) : <div>Now Loading...</div>}
    </Page>
  );
};

export default Search;
