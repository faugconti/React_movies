import * as actionTypes from './actionTypes';


export const fetchMoviesStart = () => {
    return {
        type: actionTypes.MOVIES_FETCH_START
    }
};

export const saveMoviesSuccess = (movies) => {
    return {
        type: actionTypes.MOVIES_SAVE_SUCCESS,
        movies 
    }
};
export const fetchMoviesFailed = (error) => {
    return {
        type: actionTypes.MOVIES_FETCH_FAILED,
        error
    }
};

export const updateMovieStart = () => {
    return {
        type: actionTypes.MOVIES_UPDATE_START
    }
};

export const updateMovieFailed = () => {
    return {
        type: actionTypes.MOVIES_UPDATE_FAILED
    }
};


// export const updateMovie = (movieList) => {
//     return dispatch => {
//         dispatch(updateMovieStart());
//         console.log('inside updateMOVIE',movieList)
//         setTimeout(()=>{
//             dispatch(saveMoviesSuccess(movieList))
//         },1000);
//     }
// }

export const getMovies =  () => {
    return  async dispatch => {

        const URL = `${process.env.REACT_APP_BACKEND_URL}/movies/`;
        const token = localStorage.getItem('token');

        dispatch(fetchMoviesStart());
        
        try{
            const req = await fetch(
                            URL,
                            {   
                                'method':'GET',
                                'headers': {
                                    'Content-type' : 'application/json',
                                    'Authorization': 'BEARER '+token
                                }
                            }
            );               
            const data = await req.json();
            // console.log('DATA',data);
            dispatch(saveMoviesSuccess(data.movies));
        }catch(err){
            dispatch(fetchMoviesFailed());
        }

    }
}

export const editMovies = (movies) => {
    return async dispatch => {
        const URL = `${process.env.REACT_APP_BACKEND_URL}/movies/`;
        const token = localStorage.getItem('token');

        dispatch(updateMovieStart());
        try{
            const req = await fetch(
                                    URL,
                                    {
                                        'method':'POST',
                                        'body': JSON.stringify({
                                            movies
                                        }),
                                        'headers': {
                                            'Content-type':'application/json',
                                            'authorization':'BEARER '+token
                                        }
                                    }
            );
            const data = await req.json();
            dispatch(saveMoviesSuccess(data.movies))
            
        }catch(err){
            dispatch(updateMovieFailed());
        }
    }
};

