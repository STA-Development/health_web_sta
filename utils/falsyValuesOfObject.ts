const doesObjectContainFalsyValue = (obj: object) => Object.values(obj).some((value) => !value)

export default doesObjectContainFalsyValue
