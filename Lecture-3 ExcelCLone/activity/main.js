// cd into activity
// npm init -y
//npm install electron --save-dev
// modify package.json
const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
async function createWindow() {
    const win = new BrowserWindow({
        // provides node to electron app
        webPreferences: {
            nodeIntegration: true
        }
    })

    await win.loadFile("index.html");
    win.maximize();
    win.webContents.openDevTools();

}

app.whenReady().then(createWindow);
