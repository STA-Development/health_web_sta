import axios from "axios"
export const Axios = (token: string) => {
  console.log(process.env.NEXT_PUBLIC_APP_BASE_URL)
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_APP_BASE_URL,
    timeout: 0,
  })

  axiosInstance.interceptors.request.use(function (config) {
    config.headers["opn-device-id"] = process.env.NEXT_PUBLIC_APP_DEVICE_ID
    config.headers["opn-request-id"] = process.env.NEXT_PUBLIC_APP_REQUEST_ID
    config.headers["opn-lang"] = "en"
    config.headers["captcha-token"] = token
    config.headers["opn-source"] = process.env.NEXT_PUBLIC_APP_SOURCE
    config.headers["opn-app-version"] = process.env.NEXT_PUBLIC_APP_VERSION
    return config
  })

  return axiosInstance
}
