import * as React from "react";
import styled from "styled-components";
import { RouteComponentProps, Link } from "react-router-dom";

import Page from "../template/page";
import ResItem from "../molecule/ResultItem";
import useDB, { Query } from "../../../hooks/useBookDB";
import ResultItem from "../molecule/ResultItem";
import BookEntity from "../../../entity/Book";
import { Props as ResultProps } from "../atom/ResultColumn";

const Wrapper = styled.div``;

type Props = {} & RouteComponentProps<{ id: string }>;

const BookDetail: React.FC<Props> = (props) => {
  const [query, setQuery] = React.useState<Query>({
    mode: "get",
    table: "book",
    query: { id: props.match.params.id },
  });

  const setDisplayData = (data: BookEntity): ResultProps[] => {
    const res: ResultProps[] = [];
    res.push({ label: "ISBN", content: data.isbn.toString() });
    res.push({
      label: "著者",
      content: (
        <Link to={"/creator/detail/" + data.creators[0]?.id}>
          {data.creators[0]?.name}
        </Link>
      ),
    });
    res.push({ label: "出版社", content: data.publisher?.name });
    res.push({ label: "出版年月日", content: data?.pubYear?.toString() });
    res.push({ label: "説明", content: data.description });
    console.log(res);
    return res;
  };
  const { res, status } = useDB(query);
  return (
    <Page title="書籍詳細">
      {status === "loaded" ? (
        <ResItem
          id={res[0].id}
          title={res[0].title}
          contents={setDisplayData(res[0])}
        />
      ) : (
        <div>Now Loading...</div>
      )}
    </Page>
  );
};

export default BookDetail;
