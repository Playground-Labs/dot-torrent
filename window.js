'use strict'
const { BrowserWindow } = require('electron')
const defaultProps = {
  width: 800,
  height: 800,
  show: false
}
class Window extends BrowserWindow {
  constructor ({ file, ...windowSettings }) {
    super({ ...defaultProps, ...windowSettings })
    this.webContents.toggleDevTools()
    this.maximize()
    this.loadFile(file)
    this.once('ready-to-show', () => {
      this.show()
    })
  }
}
module.exports = Window
