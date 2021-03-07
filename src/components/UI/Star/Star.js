import React from 'react';
import classes from './Star.module.css'
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';

const Star = props => {

    // let [classStyle,setClassStyle] = useState(!props.favorite ? 'ADD' : 'REMOVE')
    // let classStyle = props.favorite ? 'REMOVE' :'ADD';

    const elementClasses = [classes.Button];

    if(!props.favorite){
        elementClasses.push([classes['ADD']]);
    }else{
        elementClasses.push([classes['REMOVE']])
    }

    const clickHandler = (e) =>{
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        if(!props.loading){
            
            if(props.favorite){
                // console.log(elementClasses)
                const newList = props.movieList.filter((movie) => {
                    return movie.imdbID !== props.imdbID
                })
                // console.log('new list ',newList);
                props.updateMovieList(newList);

                elementClasses.pop();
                elementClasses.push(classes['ADD'])
                // console.log(elementClasses)
            }else{
                const newList = props.movieList.concat([props.currentMovie])
                props.updateMovieList(newList);
                // console.log('new list ',newList);
                elementClasses.pop();
                elementClasses.push(classes['REMOVE'])
                // console.log(elementClasses)
            }
        }
        
    }

    return(
        <div>
            <div 
                onClick={clickHandler}
                className={elementClasses.join(' ')}
            > 
                {!props.favorite ? '+' : '-'}   
            </div> 
        </div>
          
    )

};

const mapStateToProps = state => {
    return{
        movieList : state.movies.movieList,
        loading: state.movies.loading
    }
};

const mapDispatchToProps = dispatch => {
    return{
        updateMovieList: (movies) => dispatch(actions.editMovies(movies))
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Star);