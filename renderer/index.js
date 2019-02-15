'use strict'
const { ipcRenderer } = require('electron')
const Tracker = require('./Tracker')
document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault()
  const files = [...document.getElementById('filepicker').files]
  const filesformatted = files.map(({ name, path: pathName }) => ({
    name,
    pathName
  }))
  ipcRenderer.send('files', filesformatted)
})
ipcRenderer.on('BitTorrentFileContent', (event, torrentFile) => {
  const pre = document.getElementById('tracker')
  const initialTracker = torrentFile.announce.toString('utf-8') + '\n'

  const finalTrackerList = torrentFile['announce-list'].reduce((tracker, trackerList) => {
    tracker += trackerList.toString('utf-8') + '\n'
    return tracker
  }, initialTracker)
  pre.innerText = finalTrackerList

  let torrentTracker = new Tracker(
    torrentFile['announce-list']
  )
  torrentTracker.getPeers()
})
