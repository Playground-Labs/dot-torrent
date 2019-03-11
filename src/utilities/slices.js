let sliceContainer = []
const slicedParts = (wholePart, sliceSize) => {
  for (let i = 0; i < wholePart.length; i += sliceSize) {
    sliceContainer.push(wholePart.slice(i, i + sliceSize))
  }
  return sliceContainer
}
export default slicedParts
