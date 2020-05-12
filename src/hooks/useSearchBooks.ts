import { useEffect, useState } from "react";
import * as searchBook from "../util/searchBook";

type Result =
  | { status: "loading"; book?: undefined }
  | { status: "loaded"; book: searchBook.Book };

const useSearchBooks = (isbn: string): Result => {
  const [result, setResult] = useState<Result>({ status: "loading" });
  const test: searchBook.Book = {
    ISBN: 9784309416762,
    authors: ["高嶋哲夫"],
    title: "脳人間の告白",
    description:
      "日本の脳研究の最前線を走る医師・本郷を襲った突然の自動車事故。気が付けば彼は一筋の光もない暗闇の中にいた。感覚のない身体、無限にも感じる時間、そして恋人・秋子への想い...次第に彼の精神は、恐怖に押し潰されそうになる。やがて彼は、自らの置かれている驚愕の状況を知り絶望する。「何てことをしてくれたんだ!」―突然の刑事の来訪で揺れるK大学医学部脳神経外科研究棟三〇五号室を舞台に、衝撃の物語が幕を開ける!",
    publisher: "河出書房新社",
    publishedYear: "2019-04-20",
  };
  useEffect(() => {
    setResult({ status: "loading" });
    console.log("start useeffect");
    if (isbn != "") {
      console.log("start search");
      searchBook.default(isbn).then((res) => {
        setResult({ status: "loaded", book: res });
      });
      // setResult({ status: "loaded", book: test });
    }
  }, [isbn]);

  return result;
};

export default useSearchBooks;
