import axios from 'axios'
import {guid} from '@fh-health/utils/guid'

const generateRequestId = () => guid()
const getOrGenerateDeviceId = () => {
  const deviceId = localStorage.getItem('deviceId')
  if (deviceId) {
    return deviceId
  }
  const newDeviceId = guid()
  localStorage.setItem('deviceId', newDeviceId)
}
export const Axios = (parameters?: {token?: string; baseURL?: string}) => {
  const token = parameters?.token
  const baseURL = parameters?.baseURL || process.env.USER_SERVICE_URL
  const axiosInstance = axios.create({baseURL})

  axiosInstance.interceptors.request.use((config) => {
    config.headers['opn-device-id'] = getOrGenerateDeviceId()
    config.headers['opn-request-id'] = generateRequestId()
    config.headers['opn-lang'] = 'en'
    config.headers['captcha-token'] = token
    config.headers['opn-source'] = process.env.APP_SOURCE
    config.headers['opn-app-version'] = process.env.APP_VERSION
    return config
  })

  return axiosInstance
}
