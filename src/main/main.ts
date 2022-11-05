import { app, BrowserWindow, ipcMain } from 'electron';
import path = require('path');
import fs = require('fs');
import os from 'os';

let mainWindow: BrowserWindow | null = null;

const createWindow = async () => {
  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  let loadUrl;
  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = 'index.html';
    loadUrl = url.href;
  }
  else
    loadUrl = `file://${path.resolve(__dirname, '../renderer/', 'index.html')}`;

  mainWindow.removeMenu();
  mainWindow.loadURL(loadUrl);

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

};

async function handleLogin(event: Event, args: any) {
  var success = false;

  // await axios.post(
  //   'https://f2881231-85f0-43c9-a6be-e814932a6e38.mock.pstmn.io/login',
  //   { 
  //     email: args.email,
  //     password: args.password
  //   })
  //   .then(function(response) {
  //     if (response.data.error == false)
  //       success = true;
  //   })
  //   .catch(function(error) {
  //     console.log(error);
  //   }
  // );

  //Just to make testing easier on your end
  await new Promise(resolve => setTimeout(resolve, 2000));
  if (args.email == 'player@r1se.com' && args.password == 'pa11w0rd!') 
    success = true;

  return success;
}

function handleLogout() {
  //Logout logic
  return 1;
}

const filepath = `${os.homedir()}/Desktop/readme.json`;

function handleReadFile() {
  const json = fs.readFileSync(filepath, 'utf8');
  return json;
}

function handleUpdateFile(event: Event, args: any) {
  fs.writeFileSync(filepath, args.content);
  return 1;
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.whenReady().then(() => {
  ipcMain.handle('login', handleLogin);
  ipcMain.handle('logout', handleLogout);
  ipcMain.handle('readFile', handleReadFile);
  ipcMain.handle('updateFile', handleUpdateFile);

  createWindow();
  app.on('activate', () => {
    if (mainWindow === null) createWindow();
  });
})