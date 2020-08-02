import { createConnection, Like } from "typeorm";
import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
const { client } = require("electron-connect");
import { IpcController } from "./util/ipcapi";

let mainWindow: BrowserWindow | null;

const createWindow = async () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindow.loadURL(`file:///${__dirname}/index.html`);
  mainWindow.webContents.openDevTools;
  IpcController.initialize();
  //mainWindow.setMenu(null);

  // DB接続
  //   const connection = await createConnection({
  //     type: "sqlite",
  //     synchronize: true,
  //     logging: true,
  //     logger: "simple-console",
  //     database: "database.sqlite",
  //     entities: [PostEntity],
  //   });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  // TODO:build時に以下の一文を消すような機構を組み込む
  client.create(mainWindow);
};

app.on("ready", createWindow);
