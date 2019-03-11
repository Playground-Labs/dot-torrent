const crypto = require('crypto')
let uniqueID = null
const uniqueId = () => {
  if (!uniqueID) {
    uniqueID = crypto.randomBytes(20)
    Buffer.from('-NS1000-').copy(uniqueID, 0)
    return uniqueID
  } else {
    return uniqueID
  }
}
export default uniqueId
