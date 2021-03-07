import React from "react";
// import classes from './Star.module.css'
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import "../../../App.css";

const Star = (props) => {
  // let [classStyle,setClassStyle] = useState(!props.favorite ? 'ADD' : 'REMOVE')
  // let classStyle = props.favorite ? 'REMOVE' :'ADD';

  const elementClasses = ['boton'];

  if (!props.favorite) {
    elementClasses.push("ADD");
  } else {
    elementClasses.push("REMOVE");
  }

  const clickHandler = async (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    if (!props.loading) {
      if (props.favorite) {
        // console.log(elementClasses)
        const newList = props.movieList.filter((movie) => {
          return movie.imdbID !== props.imdbID;
        });
        // console.log('new list ',newList);
        await props.updateMovieList(newList);

        elementClasses.pop();
        elementClasses.push("ADD");
        // console.log(elementClasses)
      } else {
        const newList = props.movieList.concat([props.currentMovie]);
        await props.updateMovieList(newList);
        // console.log('new list ',newList);
        elementClasses.pop();
        elementClasses.push("REMOVE");
        // console.log(elementClasses)
      }
    }
  };
  console.log(elementClasses.join(" "));
  return (
    <div>
      <div
        // className="boton"
        onClick={clickHandler}
        className={elementClasses.join(' ')}
      >
        {!props.favorite ? "+" : "-"}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    movieList: state.movies.movieList,
    loading: state.movies.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateMovieList: (movies) => dispatch(actions.editMovies(movies)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Star);
