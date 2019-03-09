'use strict'
const { BrowserWindow } = require('electron')
const path = require('path')

const defaultProps = {
  width: 800,
  height: 800,
  show: false,
  icon: path.join(__dirname, 'icon.png')
}
const webPreferences = {
  nodeIntegration: true
}
class Window extends BrowserWindow {
  constructor ({ file, ...windowSettings }) {
    super({ ...defaultProps, ...webPreferences, ...windowSettings })
    this.webContents.toggleDevTools()
    this.maximize()
    this.loadFile(file)
    this.once('ready-to-show', () => {
      this.show()
    })
  }
}
module.exports = Window
