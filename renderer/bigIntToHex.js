'use strict'
const BigInt16 = BigInt(16)
let hexDecimalMap = (hex) => {
  switch (hex) {
    case BigInt(0):
      return 0x00.toString(16)
    case BigInt(1):
      return 0x01.toString(16)
    case BigInt(2):
      return 0x02.toString(16)
    case BigInt(3):
      return 0x03.toString(16)
    case BigInt(4):
      return 0x04.toString(16)
    case BigInt(5):
      return 0x05.toString(16)
    case BigInt(6):
      return 0x06.toString(16)
    case BigInt(7):
      return 0x07.toString(16)
    case BigInt(8):
      return 0x08.toString(16)
    case BigInt(9):
      return 0x09.toString(16)
    case BigInt(10):
      return 0x0a.toString(16)
    case BigInt(11):
      return 0x0b.toString(16)
    case BigInt(12):
      return 0x0c.toString(16)
    case BigInt(13):
      return 0x0d.toString(16)
    case BigInt(14):
      return 0x0e.toString(16)
    case BigInt(15):
      return 0x0f.toString(16)
  }
}
module.exports.BufferFormatted = (input, size) => {
  let allocBuffer = Buffer.allocUnsafe(size)
  let hexArray = []
  let hexBuffer = []
  const value = BigInt(input)
  let quotient = value / BigInt16
  let reminder = value % BigInt16
  hexArray.push(hexDecimalMap(reminder))
  while (quotient >= BigInt16) {
    let newQuotient = quotient / BigInt16
    reminder = quotient % BigInt16
    quotient = newQuotient
    hexArray.push(hexDecimalMap(reminder))
  }
  hexArray.push(hexDecimalMap(quotient))
  hexArray = hexArray.reverse()
  while (hexArray.length !== 0) {
    hexBuffer.push(parseInt(hexArray[0].concat(hexArray[1]), 16))
    hexArray.splice(0, 2)
  }
  Buffer.from(hexBuffer).copy(allocBuffer, allocBuffer.byteLength - hexBuffer.length)
  return allocBuffer
}
