import uniqueClientId from './uniqueClientId'
class Message {
  buildHandShake (torrentParser) {
    const bufferData = Buffer.alloc(68)
    bufferData.writeUInt8(19, 0)
    bufferData.write('BitTorrent protocol', 1)
    bufferData.writeUInt32BE(0, 20)
    bufferData.writeUInt32BE(0, 24)
    torrentParser.infoHash().copy(bufferData, 28)
    uniqueClientId.uniqueId().copy(bufferData, 48)
    return bufferData
  }
  buildKeepAlive () {
    return Buffer.alloc(8)
  }
  buildChoke () {
    const bufferData = Buffer.alloc(5)
    bufferData.writeUInt32BE(1, 0)
    bufferData.writeUInt8(0, 4)
    return bufferData
  }
  buildUnChoke () {
    const bufferData = Buffer.alloc(5)
    bufferData.writeUInt32BE(1, 0)
    bufferData.writeUInt8(1, 4)
    return bufferData
  }
  buildInterested () {
    const bufferData = Buffer.alloc(5)
    bufferData.writeUInt32BE(1, 0)
    bufferData.writeUInt8(2, 4)
    return bufferData
  }
  buildUnInterested () {
    const bufferData = Buffer.alloc(5)
    bufferData.writeUInt32BE(1, 0)
    bufferData.writeUInt8(3, 4)
    return bufferData
  }
  buildHave (payload) {
    const bufferData = Buffer.alloc(9)
    bufferData.writeUInt32BE(5, 0)
    bufferData.writeUInt8(4, 4)
    bufferData.writeUInt32BE(payload, 5)
    return bufferData
  }
  buildbitFiled (payload, bitfield) {
    const bufferData = Buffer.alloc(14)
    bufferData.writeUInt32BE(payload.length + 1, 0)
    bufferData.writeUInt8(5, 4)
    bitfield.copy(bufferData, 5)
    return bufferData
  }
  buildRequest (payload) {
    const bufferData = Buffer.alloc(17)
    bufferData.writeUInt32BE(13, 0)
    bufferData.writeUInt8(6, 4)
    bufferData.writeUInt32BE(payload.index, 5)
    bufferData.writeUInt32BE(payload.begin, 9)
    bufferData.writeUInt32BE(payload.length, 13)
    return bufferData
  }
  buildPiece (payload) {
    const bufferData = Buffer.alloc(payload.block.length + 13)
    bufferData.writeUInt32BE(payload.block.length + 9, 0)
    bufferData.writeUInt8(7, 4)
    bufferData.writeUInt32BE(payload.index, 5)
    bufferData.writeUInt32BE(payload.begin, 9)
    payload.block.copy(bufferData, 13)
    return bufferData
  }
  buildCancel (payload) {
    const bufferData = Buffer.alloc(17)
    bufferData.writeUInt32BE(13, 0)
    bufferData.writeUInt8(8, 4)
    bufferData.writeUInt32BE(payload.index, 5)
    bufferData.writeUInt32BE(payload.begin, 9)
    bufferData.writeUInt32BE(payload.length, 13)
    return bufferData
  }
  buildPort (payload) {
    const bufferData = Buffer.alloc(7)
    bufferData.writeUInt32BE(3, 0)
    bufferData.writeUInt8(9, 4)
    bufferData.writeUInt16BE(payload, 5)
    return bufferData
  }
  parseMessage (message) {
    const id = message.length > 4 ? message.readUInt8(4) : null
    let payload = message.length > 5 ? message.slice(5) : null
    if (id === 6 || id === 7 || id === 8) {
      const messageBody = payload.slice(8)
      payload = {
        index: payload.readUInt32BE(0),
        begin: payload.readUInt32BE(4)
      }
      payload[id === '7' ? 'block' : 'length'] = messageBody
    }
    return {
      size: message.readUInt32BE(0),
      id: id,
      payload: payload
    }
  }
}
export default Message
