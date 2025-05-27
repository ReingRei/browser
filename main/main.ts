import { app, BrowserWindow, ipcMain } from "electron";

let window: BrowserWindow | null = null;

function createWindow(): void {
  window = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      preload: __dirname + "/preload.js",
      contextIsolation: true,
    },
  });
  window.loadURL("http://localhost:3000");

  window.webContents.openDevTools()
  ipcMain.on("reload", () => {
    window?.webContents?.reload();
  });

  ipcMain.on("navigate-url", (event, url) => {
    console.log("URL recebida:", url, 'Aquiii');
    window?.loadURL(url);
  });
  console.log("Window created");
}

app?.whenReady().then(() => createWindow());

app?.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
