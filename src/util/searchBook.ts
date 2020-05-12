import { xml2js } from "xml-js";
import * as util from "../util/util";

export type Book = {
  title: string;
  authors: string[];
  publishedYear: string;
  ISBN: number;
  description: string;
  publisher: string;
};

const preproText = (str: string) => {
  str = util.toHalfWidth(str);
  str = str.replace(" ", "");
  return str;
};

const testfunc = async (isbn: string): Promise<Book> => {
  var result: Book | undefined;
  var gbares2: any;
  const ndlres: any = await fetch(
    "https://iss.ndl.go.jp/api/opensearch?isbn=" + isbn
  )
    .then((res) => res.text())
    .then((res) => xml2js(res, { compact: true }))
    .then(async (res: any) => {
      if (parseInt(res.rss.channel["openSearch:totalResults"]._text) > 0) {
        const query = () => {
          const item = util.fixArray(res.rss.channel.item, false, -1);
          console.log(item["dcndl:volume"]);
          if (item["dcndl:volume"] === undefined) {
            return item.title._text;
          } else {
            return item.title._text + " " + item["dcndl:volume"]._text;
          }
        };
        console.log(query());
        //console.log(res.rss.channel.item.title._text);
        gbares2 = await fetch(
          "https://www.googleapis.com/books/v1/volumes?q=" + query()
        ).then((res) => res.json());
      }
      console.log(res);

      return res;
    });

  const gbares: any = await fetch(
    "https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbn
  ).then((res) => res.json());

  console.log(ndlres.rss.channel, gbares, gbares2);

  const item = util.fixArray(ndlres.rss.channel.item, false, -1);
  const temptitle = (): string => {
    if (item["dcndl:volume"] === undefined) {
      return item.title._text as string;
    } else {
      return (item.title._text + " " + item["dcndl:volume"]?._text) as string;
    }
  };

  console.log(
    preproText(gbares2.items[0].volumeInfo.title),
    preproText(temptitle())
  );
  console.log(
    util.editOND(
      preproText(gbares2.items[0].volumeInfo.title),
      preproText(temptitle())
    )
  );
  if (parseInt(ndlres.rss.channel["openSearch:totalResults"]._text) > 0) {
    if (gbares.totalItems > 0) {
      const rawdata = gbares.items[0].volumeInfo;
      result = {
        ISBN: parseInt(isbn),
        title: rawdata.title,
        authors: rawdata.authors,
        description: rawdata.description,
        publisher: rawdata.publisher,
        publishedYear: rawdata.publishedDate,
      };
    } else if (
      util.editOND(
        preproText(gbares2.items[0].volumeInfo.title),
        preproText(temptitle())
      ) > 0.6 &&
      util.editOND(
        preproText(gbares2.items[0].volumeInfo.title),
        preproText(temptitle())
      ) < 1.4
    ) {
      const rawdata = gbares2.items[0].volumeInfo;
      result = {
        ISBN: parseInt(isbn),
        title: rawdata.title,
        authors: rawdata.authors,
        description: rawdata.description,
        publisher: rawdata.publisher,
        publishedYear: rawdata.publishedDate,
      };
    } else {
      const title = (): string => {
        if (item["dcndl:volume"] === undefined) {
          return item.title._text as string;
        } else {
          return (item.title._text +
            " " +
            item["dcndl:volume"]?._text) as string;
        }
      };
      result = {
        ISBN: parseInt(isbn),
        title: title(),
        authors: [(item.author._text as string).toString().split(",")[0]],
        description: "",
        publisher: util.fixArray(item["dc:publisher"])?._text as string,
        publishedYear: item["pubDate"]?._text as string,
      };
    }

    if (result.publisher === undefined) {
      result.publisher = util.fixArray(item["dc:publisher"])?._text as string;
    }
  } else {
    result = undefined;
  }
  console.log("RESULT:", gbares2, result);

  return result;
};

export default testfunc;
