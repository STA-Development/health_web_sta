export const guid = () => {
  const hash = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)

  return `${hash()}${hash()}-${hash()}-${hash()}-${hash()}-${hash()}${hash()}${hash()}`
}
export const hash = () =>
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1)
