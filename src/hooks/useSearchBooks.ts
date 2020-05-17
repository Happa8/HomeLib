import { useEffect, useState } from "react";
import * as searchBook from "../util/searchBook";

type Result =
  | { status: "loading"; book?: undefined }
  | { status: "loaded"; book: searchBook.Book };

const useSearchBooks = (isbn: string): Result => {
  const [result, setResult] = useState<Result>({ status: "loading" });
  useEffect(() => {
    setResult({ status: "loading" });
    console.log("start useeffect");
    if (isbn != "") {
      console.log("start search");
      searchBook.default(isbn).then((res) => {
        setResult({ status: "loaded", book: res });
      });
    }
  }, [isbn]);

  return result;
};

export default useSearchBooks;
