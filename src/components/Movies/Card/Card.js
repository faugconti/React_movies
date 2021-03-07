import React from 'react';
import classes from './Card.module.css';
import imagen from '../../../assets/noimg.jpg';
import Star from '../../UI/Star/Star';
import {connect} from 'react-redux';

const MovieCard = (props) => {


    const setBackground = function(url){
        return {
            'backgroundImage':`url(${url})`
        }
    };

    const calcFavorite = () => {
        const item = props.movieList.filter((movie)=>{
            // console.log(props.imdbID,movie.imdbID)
            return movie.imdbID === props.imdbID
        })
        
        return item.length !== 0 ? true : false;
    };


    let imgPath = props.poster !== 'N/A' ? props.poster : imagen; 

    return (
    
        <div className={classes.Card} >
            
            <div className={classes.Image}
                onClick={props.clicked}
                data-title={props.title}
                style={setBackground(imgPath)}
            >
                {props.isAuthenticated && 
                    <Star 
                        currentMovie={{'Title':props.title,'Poster':props.poster,'imdbID':props.imdbID}}
                        imdbID={props.imdbID}
                        favorite={calcFavorite()}
                    />
                }
            </div>
            
        </div>
    );
}
 
const mapStateToProps = state => {
    return{
        isAuthenticated: state.auth.token !== null,
        movieList:      state.movies.movieList
    }
};

export default connect(mapStateToProps,null)(MovieCard);

