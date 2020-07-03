
import axios from "axios"


export const request = (config) => {
    const ins = axios.create({
        baseURL:"http://127.0.0.1:8888/api/private/v1/",
        timeout:5000
    })
    //响应拦截
    ins.interceptors.response.use(response => {
        return response.data
    })
    //请求拦截
    ins.interceptors.request.use(config => {
        return config
    })
    return ins(config)
}
