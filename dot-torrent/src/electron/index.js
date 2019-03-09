'use strict'
const { ipcRenderer } = require('electron')
const Tracker = require('../components/Tracker')
const Download = require('../components/download')
let trackerListArray = []

document.getElementById('file-picker').onchange = (event) => {
  event.srcElement.parentElement.dataset.text = [...event.target.files].map(({ name }) => (name))
  event.srcElement.parentElement.className += ' wrapper-file-picker-change'
}
document.getElementById('button-download-torrent').addEventListener('click', async (event) => {
  event.preventDefault()
  const files = await [...document.getElementById('file-picker').files]
  const filesformatted = files.map(({ path: pathName }) => ({
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
  let uniquePeers = []
  const downloadFromPeer = new Download()
  let tp = null
  torrentTracker.getPeers((peers, torrentParser) => {
    if (tp === null) {
      tp = torrentParser
    }
    uniquePeers = uniquePeers.concat(peers)
    for (let i = 0; i < uniquePeers.length; i++) {
      for (let j = i + 1; j < uniquePeers.length; j++) {
        if (uniquePeers[i].ip === uniquePeers[j].ip) {
          uniquePeers.splice(j, 1)
          if (uniquePeers[i].connectOnce === undefined) {
            uniquePeers[i].connectOnce = false
          }
        }
      }
    }
    if (uniquePeers.length >= 1) {
      uniquePeers.forEach((peer, index) => {
        if (peer.connectOnce === false) {
          downloadFromPeer.download(peer, tp)
          uniquePeers[index].connectOnce = true
        }
      })
    }
  })
})
