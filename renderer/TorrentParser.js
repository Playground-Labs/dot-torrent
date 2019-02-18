'use strict'
const bencode = require('bencode')
const crypto = require('crypto')

class TorrentParser {
  constructor (torrentFile) {
    this.torrentFile = torrentFile
  }
  infoHash () {
    const torrentInfo = bencode.encode(this.torrentFile.info)
    return crypto.createHash('sha1').update(torrentInfo).digest()
  }
  torrentSize () {
    const torrentSize = this.torrentFile.info.files ? this.torrentFile.info.files.map(file => file.length).reduce((FileLength, nextFileLength) => FileLength + nextFileLength) : this.torrentFile.info.length
    const torrentSizeBuffer = Buffer.allocUnsafe(torrentSize)
    
    return torrentSizeBuffer.writeInt32BE(parseInt(torrentSize,10))
  }
}
module.exports = TorrentParser
