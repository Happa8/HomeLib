// 参考：https://kigh-memo.hatenablog.com/entry/2020/01/02/221423

import { ipcMain, ipcRenderer, IpcMainEvent, IpcRendererEvent } from "electron";
import { v4 as uuidv4 } from "uuid";
import {
  createConnection,
  Like,
  Repository,
  EntitySchema,
  FindOneOptions,
  FindManyOptions,
} from "typeorm";
import BookEntity from "../entity/Book";
import CreatorEntity from "../entity/Creator";
import PublisherEntity from "../entity/Publisher";
import TagEntity from "../entity/Tag";
import { SetUnion, SetIntersection } from "../util/util";

// APIタイプの型定義
type IpcType = "AddBook" | "GetBooks" | "DeleteBooks" | "GetCreator";

type Entities = BookEntity | CreatorEntity | PublisherEntity | TagEntity;

// TODO: 以下2つの型定義のkeyをIpcTypeで制限することはできないか？
// Request側型定義
type IpcRequest = {
  AddBook: BookEntity;
  GetBooks: {
    query: Partial<BookEntity> | Partial<BookEntity>[];
    mode: "AND" | "OR";
    options?: FindManyOptions;
  };
  DeleteBooks: {
    id: string[];
  };
  GetCreator: Partial<CreatorEntity>;
};

// Response側型定義
type IpcResponse = {
  AddBook: BookEntity;
  GetBooks: { data: BookEntity[]; count: number };
  DeleteBooks: void;
  GetCreator: CreatorEntity;
};

// ハンドラ関数の型定義
type ResponseHandler<T extends IpcType> = (res: IpcResponse[T]) => void;

//
class ResponseHandlerMap {
  private readonly map: Map<
    string,
    { type: IpcType; handler: (req: any) => void }
  >;

  constructor() {
    this.map = new Map();
    console.log("create map!", this.map);
  }

  public set<T extends IpcType>(
    id: string,
    type: T,
    handler: ResponseHandler<T>
  ) {
    console.log("map set", [id, type, handler]);
    const setret = this.map.set(id, { type, handler });
    console.log("map setted", setret, [id, type, handler]);
  }

  public get<T extends IpcType>(
    id: string
  ): { type: T; handler: ResponseHandler<T> } | undefined {
    const got = this.map.get(id);
    // !nullはtrueを返すらしい……
    if (!got) {
      return undefined;
    }
    return { type: got.type as T, handler: got.handler };
  }

  public delete(id: string) {
    this.map.delete(id);
  }

  public get size() {
    return this.map.size;
  }
}

export class IpcClient {
  private readonly map: ResponseHandlerMap;
  private isOpen: boolean;

  constructor() {
    this.isOpen = false;
    this.map = new ResponseHandlerMap();
  }

  public open() {
    ipcRenderer.on(
      "MAIN_CHANNEL",
      (event: IpcRendererEvent, res: any, err: any, id: string) => {
        console.log(res, id, this.map);
        const { handler } = this.map.get(id);
        console.log(this.map.get(id));
        handler(res);
        this.map.delete(id);
      }
    );
    this.isOpen = true;
    console.log("open channnel");
  }

  public close() {
    ipcRenderer.removeAllListeners("MAIN_CHANNEL");
    this.isOpen = false;
  }

  public send<T extends IpcType>(
    type: T,
    req: IpcRequest[T]
  ): Promise<IpcResponse[T]> {
    return new Promise((resolve) => {
      const id = uuidv4();
      this.map.set(id, type, (res: IpcResponse[T]) => resolve(res));
      ipcRenderer.send("MAIN_CHANNEL", type, req, id);
      console.log(this.map, id);
    });
  }
}

// backend関連

type RequestHandler<T extends IpcType> = (
  req: IpcRequest[T]
) => Promise<IpcResponse[T]>;

class RequestHandlerMap {
  private map: Map<IpcType, (req: any) => Promise<any>>;

  constructor() {
    this.map = new Map();
  }

  public set<T extends IpcType>(type: T, handler: RequestHandler<T>) {
    this.map.set(type, handler);
  }

  public get<T extends IpcType>(type: T): RequestHandler<T> | undefined {
    const got = this.map.get(type);
    if (!got) {
      return undefined;
    }
    return got as RequestHandler<T>;
  }
}

export class IpcController {
  public static async initialize() {
    const handlerMap = new RequestHandlerMap();

    // DB接続
    const connection = await createConnection({
      type: "sqlite",
      synchronize: true,
      logging: true,
      logger: "simple-console",
      database: "database.sqlite",
      entities: [BookEntity, CreatorEntity, PublisherEntity, TagEntity],
    });

    console.log("DB connected!");

    // Repository取得
    const booksRepo = connection.getRepository(BookEntity);
    const tagsRepo = connection.getRepository(TagEntity);
    const publisherRepo = connection.getRepository(PublisherEntity);
    const creatorRepo = connection.getRepository(CreatorEntity);

    ipcMain.on(
      "MAIN_CHANNEL",
      async <T extends IpcType>(
        event: IpcMainEvent,
        type: T,
        req: IpcRequest[T],
        id: string
      ) => {
        try {
          const handler = handlerMap.get(type);
          const res = await handler(req);
          event.sender.send("MAIN_CHANNEL", res, null, id);
          console.log("sended", res, id);
        } catch (err) {
          event.sender.send("MAIN_CHANNEL", null, err.message, id);
        }
      }
    );

    const handleManyToManyRelation = async <T extends Entities>(
      targets: { target: Entities[]; repository: Repository<Entities> }[],
      relations: string[],
      mode: "AND" | "OR" = "AND",
      resRepository: Repository<T>,
      resultRelations?: string[]
    ): Promise<Set<T>> => {
      // TODO: 流石に冗長すぎる！！！
      let retval = new Set<T>();
      await Promise.all(
        targets.map(async (target) => {
          const tmp = new Set<T>();
          if (Array.isArray(target.target) && target.target.length > 0) {
            const targetRepo: Repository<Entities> = target.repository;
            // console.log(targetRepo);
            const targetElm = await targetRepo.find({
              select: ["id"],
              relations: relations,
              where: target.target,
            });
            // console.log("hM", target, targetElm[0]);
            await Promise.all(
              targetElm.map(async (elm: any) => {
                await Promise.all(
                  elm[relations[0]].map(async (elmRelationData: T) => {
                    console.log("ELMR", elmRelationData);
                    const resData = await resRepository.findOne({
                      relations: resultRelations || undefined,
                      where: {
                        id: elmRelationData.id,
                      },
                    });
                    tmp.add(resData);
                    // console.log(resData);
                  })
                );
              })
            );
            if (retval.size != 0) {
              if (mode == "AND") {
                retval = SetIntersection(retval, tmp);
              } else if (mode == "OR") {
                retval = SetUnion(retval, tmp);
              }
            } else {
              retval = tmp;
            }
          }
        })
      );
      return retval;
    };

    // 以下、各種API実装
    handlerMap.set("AddBook", async (req) => {
      let creators: CreatorEntity[] = [];
      let request = req;
      console.log(req.creators);

      await Promise.all(
        req.creators.map(async (creator) => {
          const cdata = await creatorRepo.findOne(creator);
          if (creator != ({ name: "" } || undefined)) {
            if (cdata != undefined) {
              creators = [...creators, cdata];
            } else {
              creators = [...creators, creator];
            }
            console.log("[cdata]", creators, cdata);
          }
        })
      );
      request.creators = creators;
      console.log(request);
      const item = await booksRepo.create(request);
      const res = await booksRepo.save(item);
      return res;
    });

    handlerMap.set("GetBooks", async (req) => {
      var retval;
      const createTarget = () => {
        if (Array.isArray(req.query)) {
          let tmp: any = [];
          req.query.forEach((qur) => {
            tmp.push({ target: qur?.creators, repository: creatorRepo });
            tmp.push({ target: qur?.tags, repository: tagsRepo });
          });
          return tmp;
        } else {
          return [
            { target: req.query?.creators, repository: creatorRepo },
            { target: req.query?.tags, repository: tagsRepo },
          ];
        }
      };

      const relationRes = await handleManyToManyRelation<BookEntity>(
        createTarget(),
        ["books"],
        req.mode,
        booksRepo,
        ["creators", "publisher"]
      );
      console.log("relationRes", await relationRes, relationRes.size);
      console.log(req.query);
      let nRQuery = req.query;
      if (Array.isArray(nRQuery)) {
        nRQuery.forEach((qur) => {
          delete qur.tags;
          delete qur.creators;
          delete qur.publisher;
        });
        nRQuery = nRQuery.filter(
          (item) => JSON.stringify(item) != JSON.stringify({})
        );
      } else {
        delete nRQuery.tags;
        delete nRQuery.creators;
        delete nRQuery.publisher;
      }
      console.log(nRQuery);

      const findOptions: FindManyOptions = {
        where: nRQuery,
        relations: ["creators", "publisher"],
        ...req.options,
      };
      const { "0": nRResArray, "1": count } = await booksRepo.findAndCount(
        findOptions
      );
      const notRelationRes = await new Set(nRResArray);
      console.log("notRelationRes", notRelationRes);

      if (relationRes.size != 0) {
        if (req.mode == "AND") {
          retval = await SetEntityIntersection(relationRes, notRelationRes);
        } else if (req.mode == "OR") {
          retval = await SetEntityUnion(relationRes, notRelationRes);
        }
      } else {
        retval = await notRelationRes;
      }

      retval = await Array.from(retval);

      console.log("retval", retval);
      return { data: retval, count: count };
    });

    handlerMap.set("DeleteBooks", async (req) => {
      req.id.forEach(async (targetId) => {
        const item = await booksRepo.findOne({ id: targetId });
        if (item != undefined) {
          const res = await booksRepo.remove(item);
          console.log(res, "removed!");
        } else {
          console.log("book not found");
        }
      });
    });

    handlerMap.set("GetCreator", async (req) => {
      return await creatorRepo.findOne(req);
    });
  }
}

// util
const SetEntityUnion = <T extends Entities>(x: Set<T>, y: Set<T>): Set<T> => {
  const SUnion = SetUnion(x, y);
  const resMap = new Map(Array.from(SUnion).map((v) => [v.id, v]));
  return new Set(Array.from(resMap.values()));
};

const SetEntityIntersection = <T extends Entities>(
  x: Set<T>,
  y: Set<T>
): Set<T> => {
  const xIdList = Array.from(x).map((e) => e.id);
  console.log("xIdList", xIdList);
  return new Set([...Array.from(y).filter((e) => xIdList.indexOf(e.id) != -1)]);
};
