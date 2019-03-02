'use strict'

const net = require('net')
const Message = require('./utilities/Message')

class Download {
  constructor () {
    this.message = new Message()
  }
  onWholeMsg (socket, callback) {
    let savedBuf = Buffer.alloc(0)
    let handshake = true
    socket.on('data', recvBuf => {
    //  console.log(`data received ${recvBuf}`)
      // msgLen calculates the length of a whole message
    //  const msgLen = () => handshake ? recvBuf.readUInt32(0)
      savedBuf = Buffer.concat([savedBuf, recvBuf])
      console.log(`data received ${savedBuf.toString('hex')}`)
      console.log(`length of the mesage is ${savedBuf.readUInt32BE(0)}`)

      /*
      while (savedBuf.length >= 4 && savedBuf.length >= msgLen()) {
        callback(savedBuf.slice(0, msgLen()))
        savedBuf = savedBuf.slice(msgLen())
        handshake = false
      }*/
    })
  }
  msgHandler (msg, socket) {
    if (this.isHandshake(msg)) socket.write(this.message.buildInterested())
  }

  // 3
  isHandshake (msg) {
    return msg.length === msg.readUInt8(0) + 49 &&
           msg.toString('utf8', 1) === 'BitTorrent protocol'
  }
  download (peer, torrentParser) {
    const socket = new net.Socket()
    socket.connect(peer.port, peer.ip, () => {
      console.log(`We have a new connection with ${peer.ip}:${peer.port}`)
    })
    this.onWholeMsg(socket, msg => this.msgHandler(msg, socket))
    socket.on('error', err => {
      console.error('this error happened:' + err.message +
        ', code: ' + err.code)
    })
    const bufferData = this.message.buildHandShake(torrentParser)
    socket.write(bufferData, () => {
      console.log('Data sent to the connection')
    })
  }
}
module.exports = Download
