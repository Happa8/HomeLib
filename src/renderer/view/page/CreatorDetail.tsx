import * as React from "react";
import styled from "styled-components";
import { RouteComponentProps, Link } from "react-router-dom";

import Page from "../template/page";
import ResItem from "../molecule/ResultItem";
import useCreatorDB, { Query } from "../../../hooks/useCreatorDB";
import useBookDB, { Query as BookQuery } from "../../../hooks/useBookDB";
import ResultItem from "../molecule/ResultItem";
import BookEntity from "../../../entity/Book";
import CreatorEntity from "../../../entity/Creator";
import { Props as ResultProps } from "../atom/ResultColumn";
import Table from "../molecule/Table";
import Button from "../atom/Button";

const Wrapper = styled.div``;

type Props = {} & RouteComponentProps<{ id: string }>;

const CreatorDetail: React.FC<Props> = (props) => {
  const [queryCreator, setQueryCreator] = React.useState<Query>({
    mode: "get",
    query: { id: props.match.params.id },
  });

  const [queryBook, setQueryBook] = React.useState<BookQuery>({
    mode: "idle",
  });

  const { res: resCreator, status: statusCreator } = useCreatorDB(queryCreator);

  React.useEffect(() => {
    if (statusCreator == "loaded") {
      setQueryBook({
        mode: "get",
        table: "book",
        andor: "AND",
        query: { creators: [{ id: resCreator.id, name: resCreator.name }] },
      });
    }
  }, [statusCreator]);

  const setCreatorDisplayData = (data: CreatorEntity): ResultProps[] => {
    const res: ResultProps[] = [];
    res.push({
      label: "ふりがな",
      content: data?.furigana,
    });
    return res;
  };

  const { res: resBook, status: statusBook } = useBookDB(queryBook);

  const setBookDisplayData = (data: BookEntity): ResultProps[] => {
    const res: ResultProps[] = [];
    res.push({ label: "ISBN", content: data.isbn.toString() });
    res.push({ label: "著者", content: data.creators[0]?.name });
    res.push({ label: "出版社", content: data.publisher?.name });
    res.push({ label: "出版年月日", content: data?.pubYear?.toString() });
    res.push({ label: "説明", content: data.description });
    return res;
  };

  const TableStyle: React.CSSProperties = {
    width: "100%",
    marginTop: "20px",
  };

  const resbook = (res: BookEntity[]) => {
    const theader: string[] = ["タイトル", "著者名", ""];
    let tcontents: any[][] = [];
    console.log("resbook", res);
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
    return <Table header={theader} contents={tcontents} style={TableStyle} />;
  };

  return (
    <Page title="著作者詳細">
      {statusCreator === "loaded" ? (
        <ResItem
          id={resCreator.id}
          title={resCreator.name}
          contents={setCreatorDisplayData(resCreator)}
        />
      ) : (
        <div>Now Loading...</div>
      )}
      {statusBook === "loaded" ? resbook(resBook) : <div></div>}
    </Page>
  );
};

export default CreatorDetail;
