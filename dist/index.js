'use strict'
const { ipcRenderer } = require('electron')

const Tracker = require('./Tracker')
const Download = require('./Download')

let trackerListArray = []

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
  if (torrentFile['announce-list'].length > 0) {
    let finalTrackerList = null
    if (torrentFile['announce-list'].length === 1) {
      trackerListArray = torrentFile['announce-list'][0]
      finalTrackerList = trackerListArray.reduce((initialTracker, nextTracker) => {
        return initialTracker.toString('utf-8') + '\n'.concat(nextTracker.toString('utf-8'))
      })
    } else {
      trackerListArray = torrentFile['announce-list']
      finalTrackerList = trackerListArray.reduce((initialTracker, nextTracker) => {
        return initialTracker.toString('utf-8') + '\n'.concat(nextTracker.toString('utf-8'))
      })
    }
    pre.innerText = finalTrackerList
  } else {
    console.error('Invalid / corrupted torrent file')
  }

  let torrentTracker = new Tracker(
    torrentFile, trackerListArray
  )
  torrentTracker.getPeers(peers => {
    const downloadFromPeer = new Download()
    peers.forEach(peer => {
      downloadFromPeer.download(peer)
    })
  })
})
