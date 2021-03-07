import React from 'react';
import classes from './MovieInfo.module.css';
import { useState, useEffect, useLayoutEffect } from 'react';
import { withRouter } from 'react-router-dom'
import { APIKey } from '../../index';
import imagen from '../../assets/noimg.jpg';
import TextMenu from '../TextMenu/TextMenu';
import Spinner from '../UI/Spinner/Spinner';

const MovieInfo = (props) => {

    const [movieInfo, setMovieInfo] = useState(null);
    const [loading, setLoading] = useState(false);

    // useEffect(()=>{
    //     console.log('props',props);
    //     if(typeof(props.location.state) === "undefined"){
    //         setLoading(true);
    //     }
    // },[props]);

    useEffect(() => {
        const id = props.match.params.id;
        
        //only execute during search or reload
        console.log(props.location.state)
        if (typeof (props.location.state) === "undefined") {
            setLoading(true);
            console.log('Sending HTTP request');
            // console.log('to: ','http://www.omdbapi.com/?i='+id+'&plot=full&'+'apikey='+APIKey)
            fetch(`https://www.omdbapi.com/?i=${id}&plot=full&apikey=${APIKey}`)
                .then(res => {
                    // console.log(res)
                    return res.json()
                })
                .then(data => {
                    console.log(data)
                    setMovieInfo(data)
                    setLoading(false)
                    console.log('ENDED Sending HTTP request');
                })
        }
    }, [props.match.params.id,props.location.state]);

    useLayoutEffect(() => {
        if (typeof (props.location.state) === "undefined") {
            setLoading(true);
        }
    }, [props.location.state]);

    const setBackground = function (url) {
        return {
            'backgroundImage': `url(${url})`
        }
    };

    // const loader = loading ||
    const movie = movieInfo || props.location.state || {};
    const imgPath = (movie.Poster !== 'N/A' ? movie.Poster : imagen) || null;
    return (
        <div className={classes.Container}>
            {loading ?
                <div className={classes.Center}>
                    <Spinner />
                </div>
                :
                <div className={classes.Container}>
                    <div className={classes.Title}>
                        {movie.Title}
                    </div>
                    <div className={classes.contentContainer}>
                        <div className={classes.imageContainer}>
                            <div style={setBackground(imgPath)} className={classes.Image}></div>
                        </div>
                        <div className={classes.menuContainer}>
                            <TextMenu movie={movie} type='info' name='Information' />
                            <TextMenu movie={movie} type='plot' name='Plot' />
                        </div>
                    </div>

                </div>
            }
        </div>
    );
}

export default withRouter(MovieInfo);