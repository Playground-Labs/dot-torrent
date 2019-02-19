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
    file: path.join('src', 'index.html')
  })

  ipcMain.on('files', async (event, filesArray) => {
    try {
      const torrentArray = await Promise.all(
        filesArray.map(async ({
          name,
          pathName
        }) => ({
          ...await bencode.decode(fs.readFileSync(pathName))
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
