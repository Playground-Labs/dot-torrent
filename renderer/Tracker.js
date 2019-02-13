'use strict'
const dgram = require('dgram')
const url = require('url')
const fs = require('fs')

class Tracker {
    constructor(...trackerURLs ) {
        [...trackerURLs].forEach((individualTracker) => {
            const trackerURL = url.parse(individualTracker.toString('utf8'))
            if(trackerURL.protocol === "udp:")
            {
                const socket = dgram.createSocket('udp4')
                const myMsg = Buffer.from('hello?','utf8')
   
                socket.send(myMsg,0,myMsg.length,trackerURL.port,trackerURL.hostname,() => {})
                socket.on('message', msg => {
                    console.log('message is', msg)
                })
            }

        })
    }

}
module.exports = Tracker
