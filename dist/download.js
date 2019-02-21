'use strict'

const net = require('net')

class Download {
  download (peer) {
    const socket = net.Socket()
    socket.on('error', (err) => {
      console.log(`server error:\n${err.stack}`)
      socket.close()
    })
    socket.connect(peer.port, peer.ip, () => {

    })
    socket.on('data', data => {

    })
  }
}
module.exports = Download
