import axios from 'axios';


const instance =  axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 10000,
})

// 请求拦截器
instance.interceptors.request.use(config => {
    return config
}, err=>{
    return Promise.reject(err)
})

// 响应拦截器
instance.interceptors.response.use(response => {
    return response.data
},err=>{
    return Promise.reject(err)
})

export default instance;