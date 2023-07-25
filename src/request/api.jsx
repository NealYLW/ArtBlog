import axiosInstance from './index';

export const loginRequest = (userData) => {
    return axiosInstance
        .post('/login', userData)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
};

export const signupRequest = (userData) => {
    return axiosInstance
        .post('/signup', userData)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
};