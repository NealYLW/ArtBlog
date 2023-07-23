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

export default loginRequest