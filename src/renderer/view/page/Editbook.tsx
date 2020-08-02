import * as React from "react";
import { useState } from "react";
import styled from "styled-components";
import { RouteComponentProps, withRouter } from "react-router-dom";

import Page from "../template/page";
import useDB, { Query } from "../../../hooks/useBookDB";
import Input from "../organism/MultipulInput";
import { Props as InputProps } from "../molecule/InputWithLabel";
import Button from "../atom/Button";
import BookEntity from "../../../entity/Book";
import ResultItem from "../molecule/ResultItem";

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

type Props = {} & RouteComponentProps<{ id: string }>;

const EditBook: React.FC<Props> = (props) => {
  const [query, setQuery] = useState<Query>({
    mode: "get",
    table: "book",
    query: { id: props.match.params.id },
  });
  const { res, status } = useDB(query);

  const [bookTitle, setBookTitle] = useState("");
  const [bookISBN, setBookISBN] = useState("");
  const [bookAuthors, setBookAuthors] = useState("");
  const [bookPublisher, setBookPublisher] = useState("");
  const [bookPubYear, setBookPubYear] = useState("");
  const [bookDescription, setBookDescription] = useState("");

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

  React.useEffect(() => {
    if (status === "loaded") {
      console.log(res);
      setBookTitle(res[0].title);
      setBookISBN(res[0].isbn.toString());
      setBookAuthors(res[0].creators[0]?.name);
      setBookPublisher(res[0].publisher.name);
      setBookPubYear(res[0].pubYear?.toString());
      setBookDescription(res[0].description);
    } else if (status == "deleted") {
      props.history.push("/search");
    }
  }, [status]);

  const createQuery = (): Query => {
    const query: BookEntity = {
      id: res[0].id,
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
  const submit = () => {
    setQuery(createQuery);
  };
  const deleteBook = () => {
    setQuery({
      mode: "delete",
      table: "book",
      id: [res[0].id],
    });
  };

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
  ];

  return (
    <Page title="編集">
      <Input InputProps={InputData} />
      <ButtonArea>
        <Button
          theme="reversed"
          onClick={() => {
            deleteBook();
          }}
        >
          削除
        </Button>
        <Button
          onClick={() => {
            submit();
          }}
        >
          更新
        </Button>
      </ButtonArea>
    </Page>
  );
};

export default withRouter(EditBook);
