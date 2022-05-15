import * as fs from 'fs'
import {hash} from '../../src/utils/guid'

const getUniqKey = (userGid: number): string | number => {
  try {
    if (userGid !== -1) {
      return userGid
    }
    const data = fs.readFileSync('./seedKey.txt', 'utf8')
    return JSON.parse(data)
  } catch (error) {
    const key = hash()
    fs.writeFileSync('./seedKey.txt', key)
    return key
  }
}
export default getUniqKey
