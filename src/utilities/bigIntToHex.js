const bigInt = (value) => {
  // JS Standard shows this as an error since BigInt has a limited implementation
  return BigInt(value)
}
const BigInt16 = bigInt(16)
let hexDecimalMap = (hex) => {
  switch (hex) {
    case bigInt(0):
      return 0x00.toString(16)
    case bigInt(1):
      return 0x01.toString(16)
    case bigInt(2):
      return 0x02.toString(16)
    case bigInt(3):
      return 0x03.toString(16)
    case bigInt(4):
      return 0x04.toString(16)
    case bigInt(5):
      return 0x05.toString(16)
    case bigInt(6):
      return 0x06.toString(16)
    case bigInt(7):
      return 0x07.toString(16)
    case bigInt(8):
      return 0x08.toString(16)
    case bigInt(9):
      return 0x09.toString(16)
    case bigInt(10):
      return 0x0a.toString(16)
    case bigInt(11):
      return 0x0b.toString(16)
    case bigInt(12):
      return 0x0c.toString(16)
    case bigInt(13):
      return 0x0d.toString(16)
    case bigInt(14):
      return 0x0e.toString(16)
    case bigInt(15):
      return 0x0f.toString(16)
  }
}
const BufferFormatted = (input, size) => {
  let allocBuffer = Buffer.allocUnsafe(size)
  let hexArray = []
  let hexBuffer = []
  const value = bigInt(input)
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
export default BufferFormatted
