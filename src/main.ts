import { createConnection, Like } from "typeorm";
import { app, BrowserWindow, ipcMain } from "electron";

let mainWindow: BrowserWindow | null;

const createWindow = async () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindow.loadURL(`file:///${__dirname}/index.html`);
  mainWindow.webContents.openDevTools;

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
};

app.on("ready", createWindow);
