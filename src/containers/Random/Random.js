import React, { Component } from 'react';
import classes from './Random.module.css';
import { APIKey } from '../../index';
import MovieCard from '../../components/Movies/Card/Card';
import Spinner from '../../components/UI/Spinner/Spinner';
import movies from '../../utils/movies';
import { v4 as uuidv4 } from 'uuid';

class Random extends Component {
    constructor(props) {
        super(props);
        this.state = {
            randomMovies: movies,
            randomList: [],
            loading: true,
            totalAmount: 14,
        }
    }

    getMovies = async () => {
        const simpleArray = [];
        let copyList = [...this.state.randomMovies];
        for (let i = (copyList.length - 1); i > 0; i--) {
            const j = Math.floor(Math.random() * i)
            const temp = copyList[i]
            copyList[i] = copyList[j]
            copyList[j] = temp
        }
        copyList = copyList.splice(0, this.state.totalAmount);

        console.log('fetching movies');
        for (let key of copyList) {
            // console.log(key)
            const response = await fetch(`https://www.omdbapi.com/?t=${key}&plot=full&apikey=${APIKey}`);
            const data = await response.json();
            simpleArray.push(data);
            // console.log(key)
            // console.log(simpleArray);

        }
        // console.log("end fetching movies",simpleArray);
        return simpleArray;


    };

    goToMovie = (movie) => {
        const current = this.props.location.pathname;
        this.props.history.push({ pathname: current + 'movie/' + movie.imdbID, state: { ...movie, complete: true } });
    }

    componentDidMount() {
        // console.log('[ComponentDidMount - Random.js]')
        console.log('fetching from server...');

        this.getMovies()
            .then((arrayResult) => {
                this.setState({ loading: false, randomList: arrayResult })
                // console.log('[ComponentDIdMount - Random.js] END')
            });

    };

    render() {

        const loader = (
            <div className={classes.center}>
                <Spinner />
            </div>
        );


        return (



            <div className={classes.Random}>
                <div className={classes.Title}>
                    Current Recommendations
                </div>
                {this.state.loading && loader}
                <div className={classes.MoviesContainer}>
                    {this.state.randomList ? this.state.randomList.map((movie, index) => {
                        return (
                            <div className={classes.movieContainer}
                                key={uuidv4()} >
                                <MovieCard
                                    clicked={() => this.goToMovie(movie)}
                                    title={movie.Title}
                                    poster={movie.Poster}
                                    imdbID={movie.imdbID}
                                />
                            </div>
                        )

                    }) : null}
                </div>
            </div>
        );
    }
}

export default Random;