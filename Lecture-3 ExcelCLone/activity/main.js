// cd into activity
// npm init -y
//npm install electron --save-dev
// modify package.json
const electron = require("electron");
const ejs = require("ejs-electron");
ejs.data({
    title: "My Excel",
    rows: 100,
    cols: 26
})
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
async function createWindow() {
    const win = new BrowserWindow({
        // provides node to electron app
        webPreferences: {
            nodeIntegration: true
        }
    })
    await win.loadFile("index.ejs");
    win.maximize();
    win.webContents.openDevTools();
}
app.whenReady().then(createWindow);
