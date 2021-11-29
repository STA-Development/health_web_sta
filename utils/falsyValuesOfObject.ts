export const doesObjectContainFalsyValue = (obj: object) => Object.values(obj).some(value => !value)
