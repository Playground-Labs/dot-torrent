// Modules to control application life and create native browser window
'use strict'
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

  ipcMain.on('files', (event, filesArray) => {
    try {
      const torrentArray = Promise.all(
        filesArray.map(({
          name,
          pathName
        }) => ({
          ...bencode.decode(fs.readFileSync(pathName))
        }))
      )
      torrentArray.forEach((torrentFile) => {
        mainWindow.webContents.send('BitTorrentFileContent', torrentFile)
      })
    } catch (error) {
      mainWindow.webContents.send('BitTorrentError', error)
    }
  })
}
app.on('ready', main)
app.on('windows-all-closed', () => {
  app.quit()
})
