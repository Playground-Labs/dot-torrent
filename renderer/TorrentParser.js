'use strict'
const bencode = require('bencode')
const crypto = require('crypto')

const bigIntToHex = require('./bigIntToHex')
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
    return bigIntToHex.BufferFormatted(torrentSize.toString(), 8)
    /*
    const torrentSizeBuffer = Buffer.alloc(8)
    const safeTorrentSize = torrentSize
    if (safeTorrentSize <= Number.MAX_SAFE_INTEGER) {
      torrentSizeBuffer.writeUInt32BE(safeTorrentSize, 4)
      return torrentSizeBuffer
    } else {
      console.error('Torrent file is too big to download. TorrentSpace currently supports limited download file size.')
    }
    */
  }
}
module.exports = TorrentParser
