'use strict'
const crypto = require('crypto')
let uniqueID = null
module.exports.uniqueId = () => {
  if (!uniqueID) {
    uniqueID = crypto.randomBytes(20)
    Buffer.from('-UT0001-').copy(uniqueID, 0)
    return uniqueID
  } else {
    return uniqueID
  }
}
