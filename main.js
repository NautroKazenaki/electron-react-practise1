const { app, BrowserWindow, ipcMain, Notification } = require("electron");
const path = require("path");
const isDev = !app.isPackaged;
//создание базового окна в электрон
const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: "white",
    webPreferences: {
      //Whether node integration is enabled. По умолчанию - false.
      nodeIntegration: false,
      worldSafeExecuteJavaScript: true,
      //Запускать или нет API Electron и определенный скрипт preload в отдельном JavaScript-контексте. По умолчанию true.
      contextIsolation: true,
      //Определяет скрипт, который будет загружен до других скриптов загружаемых в странице. 
      //Этот скрипт будет всегда иметь доступ к API NodeJS, вне зависимости включена или выключена интеграция NodeJS. 
      //Значение должно быть абсолютным путем к файлу скрипта. Когда интеграция NodeJS отключена, 
      //предварительно загруженный скрипт может повторно ввести глобальные символы NodeJS в глобальную область. 
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
};
//для авторефреша страниц на стадии разработки
if (isDev) {
  require("electron-reload")(__dirname, {
    electron: path.join(__dirname, "node_modules", ".bin", "electron"),
  });
}
//для нотификаций
ipcMain.on("notify", (_, message) => {
  new Notification({ title: "Notification", body: message }).show();
});
app.whenReady().then(createWindow);
