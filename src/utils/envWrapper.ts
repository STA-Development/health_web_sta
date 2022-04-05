import getConfig from 'next/config'

export default class Config {
  static get<T = string>(parameter: string): T {
    const config = {...getConfig().publicRuntimeConfig}
    const variable = config[parameter]
    if (!variable) {
      console.warn(`${parameter} is not defined in this environment. This is likely an error`)
    }

    return variable as T
  }

  static getBool(key: string): boolean {
    const value = Config.get(key)
    return value === 'true'
  }
}
