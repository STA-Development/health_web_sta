import axios from "axios"
import {guid} from "../utils/guid"

const generateRequestId = () => {
  return guid();

}
const getOrGenerateDeviceId = () => {
  const deviceId = localStorage.getItem("deviceId");
  if(deviceId){
    return deviceId
  } else {
    const newDeviceId = guid();
    localStorage.setItem("deviceId", newDeviceId)
  }
}
export const Axios = (token?: string) => {
  const axiosInstance = axios.create({
    baseURL: process.env.APP_BASE_URL,
  })

  axiosInstance.interceptors.request.use(function (config) {
    config.headers["opn-device-id"] = getOrGenerateDeviceId();
    config.headers["opn-request-id"] = generateRequestId();
    config.headers["authorization"] = `Bearer ${localStorage.accessToken}`
    config.headers["opn-lang"] = "en"
    config.headers["captcha-token"] = token
    config.headers["opn-source"] = process.env.APP_SOURCE
    config.headers["opn-app-version"] = process.env.APP_VERSION
    return config
  })

  return axiosInstance
}
