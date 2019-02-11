// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')
const {ipcMain} = require('electron')
const util = require('util')
const fs = require('fs')
const stat = util.promisify(fs.stat)

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

app.on("ready",() => {
  const htmlPath = path.join('src','index.html')
  mainWindow = new BrowserWindow()
  mainWindow.loadFile(htmlPath)
  
 ipcMain.on('files', async (event, filesArr) => {
   try {
     const data = await Promise.all(
       filesArr.map(async ({ name, pathName }) => ({
       ...await stat(pathName),
       name,
       pathName
       }))

     )
    mainWindow.webContents.send('metadata', data)
   } catch(error) {
    mainWindow.webContents.send('metadata:error', error)
   }
 })
})

