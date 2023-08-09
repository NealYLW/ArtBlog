import axios from 'axios';
import axiosInstance from '../request/index.jsx';

export const FETCH_PAINTINGS_REQUEST = 'FETCH_PAINTINGS_REQUEST';
export const FETCH_PAINTINGS_SUCCESS = 'FETCH_PAINTINGS_SUCCESS';
export const FETCH_PAINTINGS_FAILURE = 'FETCH_PAINTINGS_FAILURE';
export const ADD_PAINTING_REQUEST = 'ADD_PAINTING_REQUEST';
export const ADD_PAINTING_SUCCESS = 'ADD_PAINTING_SUCCESS';
export const ADD_PAINTING_FAILURE = 'ADD_PAINTING_FAILURE';
export const DELETE_PAINTING_REQUEST = 'DELETE_PAINTING_REQUEST';
export const DELETE_PAINTING_SUCCESS = 'DELETE_PAINTING_SUCCESS';
export const DELETE_PAINTING_FAILURE = 'DELETE_PAINTING_FAILURE';
export const UPDATE_PAINTING_REQUEST = 'UPDATE_PAINTING_REQUEST';
export const UPDATE_PAINTING_SUCCESS = 'UPDATE_PAINTING_SUCCESS';
export const UPDATE_PAINTING_FAILURE = 'UPDATE_PAINTING_FAILURE';




export const fetchPaintings = (userId) => dispatch => {
    // Indicate that fetching has started
    dispatch({ type: FETCH_PAINTINGS_REQUEST });

    axiosInstance.get(`/users/${userId}/paintings`)
    .then(response => {
        dispatch({ type: FETCH_PAINTINGS_SUCCESS, payload: response.data });
    })
    .catch(error => {
        dispatch({ type: FETCH_PAINTINGS_FAILURE, payload: error.message });
        console.error('Failed to fetch paintings:', error);
    });
};

export const addPainting = (values, fileList, userId) => dispatch => {
    // handleing uploading image

    dispatch({ type: ADD_PAINTING_REQUEST });

    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    
    if (fileList && fileList.length > 0) {
        formData.append('image', fileList[0].originFileObj);
    }

    axiosInstance.post(`/users/${userId}/paintings`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    .then(response => {
        dispatch({
            type: ADD_PAINTING_SUCCESS,
            payload: response.data,
        });
    })
    .catch(error => {
        dispatch({
            type: ADD_PAINTING_FAILURE,
            payload: error,
        });
    });
};

export const deletePainting = (userId, id) => dispatch => {
    dispatch({ type: DELETE_PAINTING_REQUEST });
    axiosInstance.delete(`/users/${userId}/paintings/${id}`)
    .then(response => {
        dispatch({
            type: DELETE_PAINTING_SUCCESS,
            payload: id,
        })
    .catch(error => {
        dispatch({
            type: DELETE_PAINTING_FAILURE,
            payload: error,
        })
    })
    })
};

export const updatePainting = (userId, id, values, fileList) => dispatch => {
    dispatch({ type: UPDATE_PAINTING_REQUEST });

    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    if (fileList && fileList.length > 0) {
        formData.append('image', fileList[0].originFileObj);
    }

    axiosInstance.put(`/users/${userId}/paintings/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
    })
    .then(response => {
        dispatch({
            type: UPDATE_PAINTING_SUCCESS,
            payload: response.data,
        });
    })
    .catch(error => {
        dispatch({
            type: UPDATE_PAINTING_FAILURE,
            payload: error,
        });
    });
};