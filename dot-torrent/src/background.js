// Modules to control application life and create native browser window
/*'use strict'
const path = require('path')
const fs = require('fs')
const bencode = require('bencode')

const {
  app,
  ipcMain
} = require('electron')

const Window = require('./Window')

function main () {
  let mainWindow = new Window({
    file: path.join('dist', 'index.html')
  })

  ipcMain.on('files', async (event, filesArray) => {
    const filesPromise = filesArray.map(async ({
      pathName
    }) => ({
      ...await bencode.decode(fs.readFileSync(pathName))
    }))
    Promise.all(filesPromise)
      .then(torrentArray => {
        torrentArray.forEach(torrentFile => mainWindow.webContents.send('BitTorrentFileContent', torrentFile))
      })
      .catch(error => {
        mainWindow.webContents.send('BitTorrentError', error)
      })
  })
}
app.on('ready', main)
app.on('windows-all-closed', () => {
  app.quit()
})
*/
'use strict'

import { app, protocol, BrowserWindow } from 'electron'
import {
  createProtocol,
  installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
let mainWindow
// Standard scheme must be registered before the app is ready
protocol.registerStandardSchemes(['app'], { secure: true })
function createWindow () {
  // Create the browser window.
 mainWindow = new Window({
    file: path.join('dist', 'index.html')
  })
  win = new BrowserWindow({ width: 800, height: 600 })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  win.on('closed', () => {
    win = null
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installVueDevtools()
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}