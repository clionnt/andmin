import {request} from "network/request"

export const reqLogin = ({username,password}) => request({url:'login', method:'post', data:{username,password}})

