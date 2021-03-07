import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: false,
    movieList: [],
    error: null
};

const fetchStart = (state,action) => {
    return{
        ...state,
        loading: true,
        error: null
    };
};

const saveSuccess = (state,action) => {
    return{
        ...state,
        loading:false,
        error: null,
        movieList: action.movies
    }
};

const fetchFailed = (state,action) => {
    return{
        ...state,
        loading:false,
        error: action.error,
    }
};

const updateStart = (state,action) => {
    return{
        ...state,
        loading:true
    }
};


const updateFailed = (state,action) => {
    return {
        ...state,
        loading: false,
        error: action.error
    }
};

const reducer = (state = initialState,action) => {
    switch(action.type){
        case actionTypes.MOVIES_FETCH_START:
            return fetchStart(state,action);
        case actionTypes.MOVIES_SAVE_SUCCESS:
            return saveSuccess(state,action);
        case actionTypes.MOVIES_FETCH_FAILED:
            return fetchFailed(state,action);
        case actionTypes.MOVIES_UPDATE_START:
            return updateStart(state,action);
        case actionTypes.MOVIES_UPDATE_FAILED:
            return updateFailed(state,action);
        default:
            return state;
    }
};

export default reducer;