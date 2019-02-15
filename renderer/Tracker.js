'use strict'
const dgram = require('dgram')
const url = require('url')
const crypto = require('crypto')

class Tracker {
  constructor (trackerURLs) {
    this.trackerURLs = trackerURLs
  }
  getPeers () {
    this.trackerURLs.forEach((individualTracker) => {
      const trackerURL = url.parse(individualTracker.toString('utf-8'))
      if (trackerURL.protocol === 'udp:') {
        const socket = dgram.createSocket('udp4')

        this.buildConnectionRequest(socket, trackerURL)
          .then(messageData => this.udpSend(messageData))
          .then(() => {
            socket.on('message', response => {

            })
          })
          .catch(error => console.log(error))
      }
    })
  }
  udpSend (messageData, callback = () => {}) {
    messageData.socket.send(messageData.bufferData, 0, messageData.bufferData.length, messageData.trackerURL.port, messageData.trackerURL.hostname, () => {})
  }
  async buildConnectionRequest (socket, trackerURL) {
    const bufferData = Buffer.alloc(16)
    bufferData.writeInt32BE(0x417, 0)
    bufferData.writeInt32BE(0x27101980, 4)
    bufferData.writeInt32BE(0, 8)
    crypto.randomBytes(4).copy(bufferData, 12)
    const messageData = {
      bufferData: bufferData,
      socket: socket,
      trackerURL: trackerURL
    }
    return messageData
  }
}
module.exports = Tracker
