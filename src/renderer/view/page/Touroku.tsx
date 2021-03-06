import * as React from "react";
import { useState } from "react";
import styled from "styled-components";
import useSearchBooks from "../../../hooks/useSearchBooks";
import useDB, { Query } from "../../../hooks/useBookDB";
import SearchBar from "../molecule/SearchBar";
import { Book } from "../../../util/searchBook";
import ResultItem from "../molecule/ResultItem";
import { Props as ResultProps } from "../atom/ResultColumn";
import Page from "../template/page";
import Input from "../organism/MultipulInput";
import { Props as InputProps } from "../molecule/InputWithLabel";
import Button from "../atom/Button";
import BookEntity from "../../../entity/Book";

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

const Touroku = () => {
  const [query, setQuery] = useState<string>("");
  const [bookTitle, setBookTitle] = useState("");
  const [bookISBN, setBookISBN] = useState("");
  const [bookAuthors, setBookAuthors] = useState("");
  const [bookPublisher, setBookPublisher] = useState("");
  const [bookPubYear, setBookPubYear] = useState("");
  const [bookDescription, setBookDescription] = useState("");
  const [submitQuery, setSubmitQuery] = useState<Query>({ mode: "idle" });
  const { book, status } = useSearchBooks(query);
  const { status: DBstatus } = useDB(submitQuery);
  const [testCheck, setTestCheck] = useState<string[]>([]);
  const [testRadio, setTestRadio] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case "title":
        setBookTitle(event.target.value);
        break;
      case "isbn":
        setBookISBN(event.target.value);
        break;
      case "authors":
        setBookAuthors(event.target.value);
        break;
      case "publisher":
        setBookPublisher(event.target.value);
        break;
      case "pubyear":
        setBookPubYear(event.target.value);
        break;
      case "description":
        setBookDescription(event.target.value);
        break;
    }
  };

  const createQuery = (): Query => {
    const query: BookEntity = {
      title: bookTitle,
      isbn: parseInt(bookISBN),
      creators: [{ name: bookAuthors }],
      publisher: { name: bookPublisher },
      pubYear: parseInt(bookPubYear),
      description: bookDescription,
      tags: [],
    };
    return {
      mode: "add",
      table: "book",
      query: query,
    };
  };

  const clear = () => {
    setBookTitle("");
    setBookISBN("");
    setBookAuthors("");
    setBookPublisher("");
    setBookPubYear("");
    setBookDescription("");
  };

  const handleClick = () => {
    setQuery(bookISBN.toString());
  };

  const submit = () => {
    setSubmitQuery(createQuery);
  };

  React.useEffect(() => {
    if (status == "loaded") {
      setBookTitle(book.title);
      setBookISBN(book.ISBN.toString());
      setBookAuthors(book.authors.toString());
      setBookPublisher(book.publisher);
      setBookPubYear(book.publishedYear?.toString());
      setBookDescription(book.description);
    }
  }, [status]);

  React.useEffect(() => {
    if (DBstatus == "loaded") {
      clear();
    }
  }, [DBstatus]);

  const InputData: InputProps[] = [
    {
      name: "title",
      label: "タイトル",
      type: "text",
      input: {
        value: bookTitle,
        onChange: handleChange,
      },
    },
    {
      name: "isbn",
      label: "ISBN",
      type: "text",
      input: {
        value: bookISBN,
        onChange: handleChange,
      },
    },
    {
      name: "authors",
      label: "著者",
      type: "text",
      input: {
        value: bookAuthors,
        onChange: handleChange,
      },
    },
    {
      name: "publisher",
      label: "出版社",
      type: "text",
      input: {
        value: bookPublisher,
        onChange: handleChange,
      },
    },
    {
      name: "pubyear",
      label: "出版年",
      type: "text",
      input: {
        value: bookPubYear,
        onChange: handleChange,
      },
    },
    {
      name: "description",
      label: "説明",
      input: {
        value: bookDescription,
        onChange: handleChange,
      },
      type: "textarea",
    },
    // {
    //   name: "checktest",
    //   label: "ラジオ",
    //   type: "radio",
    //   input: {
    //     data: [
    //       {
    //         label: "case1",
    //         value: "case1",
    //       },
    //       {
    //         label: "case2",
    //         value: "case2",
    //       },
    //       {
    //         label: "case3",
    //         value: "case3",
    //       },
    //     ],
    //     valueSetter: setTestRadio,
    //     value: testRadio,
    //   },
    // },
  ];

  const resulttext = () => {
    switch (DBstatus) {
      case "idle":
        return "";
      case "loading":
        return "登録中";
      case "loaded":
        return "登録完了！";
    }
  };

  return (
    <Page title="登録">
      <Input InputProps={InputData} />
      <ButtonArea>
        <Button
          theme="reversed"
          onClick={() => {
            console.log(testRadio);
          }}
        >
          テスト
        </Button>
        <Button
          theme="reversed"
          onClick={() => {
            handleClick();
          }}
        >
          ISBNから入力
        </Button>
        <Button
          theme="reversed"
          onClick={() => {
            clear();
          }}
        >
          クリア
        </Button>
        <Button
          onClick={() => {
            submit();
          }}
        >
          登録
        </Button>
      </ButtonArea>
      <div>{resulttext()}</div>
    </Page>
  );
};

export default Touroku;
