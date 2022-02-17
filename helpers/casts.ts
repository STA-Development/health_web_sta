export function isNum(val) {
  // eslint-disable-next-line no-restricted-globals
  return !isNaN(val)
}
export function roundWithOneDecimal(val) {
  return Math.floor(val * 10) / 10
}
