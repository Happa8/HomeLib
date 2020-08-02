import { useEffect, useState } from "react";
import Book from "../entity/Book";
import { ipcClient } from "../renderer/app";
import { Table, FindManyOptions, FindOperator } from "typeorm";
// import useSWR from "swr";

type Result =
  | { status: "idle"; res?: undefined; count?: number }
  | { status: "loading"; res?: undefined; count?: number }
  | { status: "loaded"; res: Book[]; count?: number }
  | { status: "deleted"; res: undefined; count?: number };

// TODO:table選択を無くす
export type Query =
  | { mode: "idle" }
  | {
      mode: "get";
      table: "book";
      query?: Partial<Book> | Partial<Book>[];
      andor?: "AND" | "OR";
      options?: FindManyOptions;
    }
  | { mode: "add"; table: "book"; query: Book }
  | { mode: "delete"; table: "book"; id: string[] };

const useBookDB = (query: Query): Result => {
  const [result, setResult] = useState<Result>({ status: "idle" });

  useEffect(() => {
    setResult({ status: "loading" });
    switch (query.mode) {
      case "idle":
        setResult({ status: "idle" });
        break;
      case "get":
        switch (query.table) {
          case "book":
            ipcClient
              .send("GetBooks", {
                query: query.query,
                mode: query.andor || "AND",
                options: query?.options,
              })
              .then((res) => {
                setResult({
                  status: "loaded",
                  res: res.data,
                  count: res.count,
                });
              });
        }
        break;
      case "add":
        switch (query.table) {
          case "book":
            ipcClient.send("AddBook", query.query).then((res) => {
              setResult({ status: "loaded", res: [res] });
            });
        }
        break;
      case "delete":
        switch (query.table) {
          case "book":
            ipcClient.send("DeleteBooks", { id: query.id });
            setResult({ status: "deleted", res: undefined });
        }
      default:
        break;
    }
  }, [query]);

  return result;
};

export default useBookDB;
