import axios from 'axios';
import { setAuthStatus } from '../useAuthStatus';

const instance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 200000,
});



// Request interceptor
instance.interceptors.request.use(
    config => {
        
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log('Request made with config:', config);
        return config;
    },
    err => {
        console.log('Request error:', err);
        return Promise.reject(err);
    }
);

// Response interceptor
instance.interceptors.response.use(
    response => {
        console.log('Response received:', response);
        return response.data;
    },
    err => {
        console.log('Response error:', err);
        if (err.response && err.response.status === 401) {
            // If a request is unauthorized, remove the token and redirect to login
            localStorage.removeItem('token');
            // redirect to the login route if not authenticated(token is not present)
            setAuthStatus(false);   
        }
        return Promise.reject(err);
    }
);

export default instance;