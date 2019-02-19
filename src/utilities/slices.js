'user strict'
let sliceContainer = []
module.exports.slicedParts = (wholePart, sliceSize) => {
  for (let i = 0; i < wholePart.length; i += sliceSize) {
    sliceContainer.push(wholePart.slice(i, i + sliceSize))
  }
  return sliceContainer
}
