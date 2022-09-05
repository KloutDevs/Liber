// DEPENDENCIES

const { app, BrowserWindow, Notification, ipcMain } = require('electron');
const __path = require('path');
const __url = require('url');
const a_colors = require('ansi-colors');
const { logger } = require('./utils/logger');
const DatabaseHandler = require('./utils/database');
const Database = new DatabaseHandler();
console.log(process.env.DATABASE_URI)
// IF THE APP IS ALREADY PACKAGED

if(app.isPackaged == false){
    require('electron-reload')(__dirname, {
        electron: __path.join(__dirname, '../node_modules', '.bin', 'electron')
    });
}

// APP START
process.on('uncaughtException', error => logger('error', error));

app.on('ready', function(){
    let mainWindow = new BrowserWindow({
        width: 1368,
        height: 768,
        center: true,
        frame: true,
        minWidth: 1024,
        minHeight: 768,
        show: false,
        icon: __path.join(__dirname, 'public/img/icon.png'),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });
    let loginWindow = new BrowserWindow({
        width: 400,
        height: 600,
        center: true,
        frame: true,
        minWidth: 400,
        minHeight: 600,
        show: false,
        icon: __path.join(__dirname, 'public/icon.png'),
        parent: mainWindow,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });
    //loginWindow.setMenu(null);
    //mainWindow.setMenu(null);
    loginWindow.webContents.loadURL(__url.format({
        pathname: __path.join(__dirname, 'views/login.html'),
        protocol: 'file',
        slashes: true,
    }));
    mainWindow.webContents.loadURL(__url.format({
        pathname: __path.join(__dirname, 'views/index.html'),
        protocol: 'file',
        slashes: true,
    }));

    //mainWindow.webContents.openDevTools();
    loginWindow.on('ready-to-show', () => {
        loginWindow.show();
    });

    try{
        Database.connect();
    }catch(e){
        logger('custom', a_colors.gray("#-------------------------------------------------------------#"));
        logger('error', "Ocurrió un error al intentar cargar la "+a_colors.cyan("Base de Datos")+".");
        logger('custom', a_colors.gray("#-------------------------------------------------------------#"));
    }
    console.log(ipcMain._events)
    ipcMain.handle('login', async (event) => {
        loginWindow.hide();
        mainWindow.show();
        logger('custom', a_colors.cyan("YOU'RE LOGGED!"))
    });

    ipcMain.handle('logout', async (event) => {
        loginWindow.show();
        mainWindow.hide();
        logger('custom', a_colors.red("YOU'RE LOG OUT!"))
    });


    ipcMain.handle('verifyLogin', async(event, data) => {
    });


});
