import axios from 'axios';


const instance =  axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 10000,
})

// 请求拦截器

instance.interceptors.request.use(config => {
    console.log('Request made with config:', config);
    return config
}, err=>{
    console.log('Request error:', err);
    return Promise.reject(err)
})

// 响应拦截器
instance.interceptors.response.use(response => {
    console.log('Response received:', response);
    return response.data
},err=>{
    console.log('Response error:', err);
    return Promise.reject(err)
})
export default instance;