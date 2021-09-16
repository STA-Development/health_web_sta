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
    baseURL: process.env.NEXT_PUBLIC_APP_BASE_URL,
    timeout: 0,
  })

  axiosInstance.interceptors.request.use(function (config) {
    config.headers["opn-device-id"] = getOrGenerateDeviceId();
    config.headers["opn-request-id"] = generateRequestId();
    config.headers["opn-lang"] = "en"
    config.headers["captcha-token"] = token
    config.headers["opn-source"] = process.env.NEXT_PUBLIC_APP_SOURCE
    config.headers["opn-app-version"] = process.env.NEXT_PUBLIC_APP_VERSION
    return config
  })

  return axiosInstance
}
