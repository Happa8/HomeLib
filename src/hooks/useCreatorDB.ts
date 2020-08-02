import { useEffect, useState } from "react";
import Creator from "../entity/Creator";
import { ipcClient } from "../renderer/app";
import { Table } from "typeorm";
// import useSWR from "swr";

type Result =
  | { status: "idle"; res?: undefined }
  | { status: "loading"; res?: undefined }
  | { status: "loaded"; res: Creator }
  | { status: "deleted"; res: undefined };

// TODO:table選択を無くす
export type Query =
  | { mode: "idle" }
  | { mode: "get"; query?: Partial<Creator>; andor?: "AND" | "OR" }
  | { mode: "add"; query: Creator }
  | { mode: "delete"; id: string[] };

const useCreatorDB = (query: Query): Result => {
  const [result, setResult] = useState<Result>({ status: "idle" });

  useEffect(() => {
    setResult({ status: "loading" });
    switch (query.mode) {
      case "idle":
        setResult({ status: "idle" });
        break;
      case "get":
        ipcClient.send("GetCreator", query.query).then((res) => {
          setResult({ status: "loaded", res: res });
        });
        break;
      default:
        break;
    }
  }, [query]);

  return result;
};

export default useCreatorDB;
