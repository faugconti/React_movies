import React, { Component } from 'react';
import {connect} from 'react-redux';
import classes from './Favorites.module.css';
import { v4 as uuidv4 } from 'uuid';
import MovieCard from '../../components/Movies/Card/Card';

class Favorite extends Component{

    state = {
        // loading:true
    }


    componentDidMount(){
        // console.log('[FAVORITES] Mounted');
        // get from store the movies..
    }

    goToMovie = (movie)=>{
        // console.log(this.props.history)
        this.props.history.push(
                {pathname:'movie/'+movie.imdbID,
                });
    }

    // goToMovie = (movie)=>{
    //     const current = this.props.location.pathname;
    //     console.log(movie)
    //     this.props.history.push({pathname:'/movie/'+movie.imdbID});
    // }
    render(){
        return(
            <div className={classes.Favorites}>
                
                <div className={classes.Title}>
                    {this.props.movieList.length>0 ? 
                        `Your ${this.props.movieList.length} Favorite Movies`
                    : 'You dont have any favorites yet, start adding movies!'}
                </div>
                {/* {this.props.loading && loader} */}
                <div className={classes.MoviesContainer}>
                {this.props.movieList ? this.props.movieList.map((movie,index) => {
                    return (
                        <div className={classes.movieContainer} 
                            key={uuidv4()} >
                            <MovieCard 
                                clicked={()=>this.goToMovie(movie)}
                                title={movie.Title} 
                                poster={movie.Poster}
                                imdbID={movie.imdbID}    
                            /> 
                        </div>
                    )
                        
                }):null}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.movies.loading,
        movieList: state.movies.movieList
    }
};


export default connect(mapStateToProps,null)(Favorite);