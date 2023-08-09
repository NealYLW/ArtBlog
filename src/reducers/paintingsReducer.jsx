import {
    FETCH_PAINTINGS_REQUEST,
    FETCH_PAINTINGS_SUCCESS,
    FETCH_PAINTINGS_FAILURE,
    ADD_PAINTING_REQUEST,
    ADD_PAINTING_SUCCESS,
    ADD_PAINTING_FAILURE,
    DELETE_PAINTING_REQUEST,
    DELETE_PAINTING_SUCCESS,
    DELETE_PAINTING_FAILURE,
    UPDATE_PAINTING_REQUEST,
    UPDATE_PAINTING_SUCCESS,
    UPDATE_PAINTING_FAILURE
} from '../actions/actionTypes';

const initialState = {
    data: [],
    loading: false,
    error: null,
    fetchStatus: null,
    fetchError: null,
    uploadStatus: null,
    uploadError: null,
    deleteStatus: null,
    deleteError: null,
    updateStatus: null,
    updateError: null,
};

const paintingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PAINTINGS_REQUEST:
            return {
                ...state,
                loading: true,
                fetchStatus: 'LOADING',
                fetchError: null,
            };
        case ADD_PAINTING_REQUEST:
            return {
                ...state,
                loading: true,
                uploadStatus: 'LOADING',
                uploadError: null,
            };
        case DELETE_PAINTING_REQUEST:
            return {
                ...state,
                loading: true,
                deleteStatus: 'LOADING',
                deleteError: null,
            };
        case UPDATE_PAINTING_REQUEST:
            return {
                ...state,
                loading: true,
                updateStatus: 'LOADING',
                updateError: null,
            };

        case FETCH_PAINTINGS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                fetchStatus: 'SUCCESS',
                fetchError: null,
            };

        case ADD_PAINTING_SUCCESS:
            return {
                ...state,
                loading: false,
                data: [...state.data, action.payload],
                uploadStatus: 'SUCCESS',
            };

        case UPDATE_PAINTING_SUCCESS:
            return {
                ...state,
                loading: false,
                data: state.data.map(data => 
                    data.id === action.payload.id ? action.payload : data
                ),
                updateStatus: 'SUCCESS',
            };

        case DELETE_PAINTING_SUCCESS:
            return {
                ...state,
                loading: false,
                data: state.data.filter(data => data.id !== action.payload),
                deleteStatus: 'SUCCESS',
                deleteError: null,
            };

        case FETCH_PAINTINGS_FAILURE:
            return {
                ...state,
                loading: false,
                fetchStatus: 'FAILURE',
                fetchError: action.payload,
            };
        case ADD_PAINTING_FAILURE:
            return{
                ...state,
                loading: false,
                uploadStatus: 'FAILURE',
                uploadError: action.payload,
            };
        case DELETE_PAINTING_FAILURE:
            return {
                ...state,
                loading: false,
                deleteStatus: 'FAILURE',
                deleteError: action.payload,
            };
        case UPDATE_PAINTING_FAILURE:
            return {
                ...state,
                loading: false,
                updateStatus: 'FAILURE',
                updateError: action.payload,
            };

        default:
            return state;
    }
};

export default paintingsReducer;