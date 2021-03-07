import React,{Component} from 'react';
import classes from './Search.module.css';
import {APIKey} from '../../index';
import Spinner from '../../components/UI/Spinner/Spinner';
import MovieCard from '../../components/Movies/Card/Card';
import {v4 as uuid} from 'uuid';


class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputName:'',
            inputYear:null,
            type:'',
            loading:false,
            searchResults:null
        }
    }
    toggleType = (newType) => {
        if(this.state.type===newType){
            this.setState({type:''}); //untoggle
        }else{
            this.setState({type:newType});
        }
    };

    searchMovie = () => {
        // console.log(this.props)
        // console.log(this.state);
        // console.log(APIKey)
        let baseURL = 'http://www.omdbapi.com/?s='+this.state.inputName+'&page=1&';
        if(this.state.inputYear){
            baseURL = baseURL + `&y=${this.state.inputYear}`;
        }
        if(this.state.type){
            baseURL = baseURL + `&type=${this.state.type}`;
        }
        baseURL = baseURL + `&apiKey=${APIKey}`;
        this.setState({searchResults:null});
        this.setState({loading:true});
        // console.log(baseURL);
        return fetch(baseURL)
            .then(res=>res.json())
            .then(data=>{
                // console.log(data)
                this.setState({searchResults:data.Search,loading:false});
            })
    };

    goToMovie = (movie)=>{
        // const current = this.props.location.pathname;
        // console.log(current)
        this.props.history.push({pathname:'/movie/'+movie.imdbID});
    }

    render() { 
        return ( 
            <div className={classes.Container}>
                <div className={classes.Title}>Search your Movie</div>
                <input type="text" 
                    value={this.state.inputName} 
                    onChange={(e)=> this.setState({inputName: e.target.value})} 
                    placeholder="Title"></input>
                <input type="number" min="1950" 
                    onChange={(e)=> this.setState({inputYear: e.target.value})} 
                    placeholder="Year"></input>
                <div className={[classes.option]}
                    style={this.state.type==='movie' ? {color:'cyan'}:null} 
                    onClick={()=>this.toggleType('movie')}>Movie</div>
                <div className={classes.option} 
                    style={this.state.type==='series' ? {color:'cyan'}:null} 
                    onClick={()=>this.toggleType('series')}>Show</div>
                <div className={classes.buttonWrap}>
                    <button 
                        disabled={this.state.inputName==='' ? true : false} 
                        onClick={this.searchMovie}>Search!</button>
                </div>
                {this.state.loading && 
                    <div className={classes.center}> <Spinner /> </div>
                }
                <div className={classes.MoviesContainer}>
                {this.state.searchResults && 
                        this.state.searchResults.map(movie=>{
                            return(
                            <div className={classes.MovieContainer} key={uuid()}>
                                <MovieCard 
                                    complete={false}
                                    clicked={()=>this.goToMovie(movie)}
                                    title={movie.Title} 
                                    poster={movie.Poster} 
                                    imdbID={movie.imdbID}
                                     />
                            </div>
                            )
                        })
                }
                </div>
                                
            </div>    
        );
    }
}
 
export default Search;

