import axios from 'axios'
import guid from '@fh-health/utils/guid'

const generateRequestId = () => guid()
const getOrGenerateDeviceId = () => {
  const deviceId = localStorage.getItem('deviceId')
  if (deviceId) {
    return deviceId
  }
  const newDeviceId = guid()
  localStorage.setItem('deviceId', newDeviceId)
}

export const authHeader = () => {
  const token = `Bearer ${localStorage.accessToken}`
  return {
    Authorization: token,
  }
}

const Axios = (parameters?: {token?: string; baseURL?: string}) => {
  const token = parameters?.token
  const baseURL = parameters?.baseURL || process.env.USER_SERVICE_URL
  const axiosInstance = axios.create({baseURL})

  axiosInstance.interceptors.request.use((config) => {
    const requestConfig = config
    requestConfig.headers['opn-device-id'] = getOrGenerateDeviceId()
    requestConfig.headers['opn-request-id'] = generateRequestId()
    requestConfig.headers['opn-lang'] = 'en'
    requestConfig.headers['captcha-token'] = token
    requestConfig.headers['opn-source'] = process.env.APP_SOURCE
    requestConfig.headers['opn-app-version'] = process.env.APP_VERSION
    return requestConfig
  })

  return axiosInstance
}

export default Axios
