import React,{useState} from 'react';
import classes from './TextMenu.module.css';

// props: movie, type , name

const TextMenu = (props) => {

    const [menuOpen,setMenuOpen] = useState(false);


    let renderInfo1 = ( props.type === 'info' && menuOpen &&
        <div className={classes.Menu__info__background}>

                    <div className={classes.Menu__info__subtitle}>
                        <span>Year: </span><span>{props.movie.Year || '?'}</span>
                    </div>
                    <div className={classes.Menu__info__subtitle}>
                        <span>Duration: </span><span>{props.movie.Runtime || '?'}</span>
                    </div>
                    <div className={classes.Menu__info__subtitle}>
                        <span>Genre: </span><span>{props.movie.Genre || '?'}</span>
                    </div>
                    <div className={classes.Menu__info__subtitle}>
                        <span>Director: </span><span>{props.movie.Director || '?'}</span>
                    </div>
                    <div className={classes.Menu__info__subtitle}>
                        <span>Cast: </span><span>{props.movie.Actors || '?'}</span>
                    </div>
                    <div className={classes.Menu__info__subtitle}>
                        <span>Language: </span><span>{props.movie.Language || '?'}</span>
                    </div>
                    <div className={classes.Menu__info__subtitle}>
                        <span>Country: </span><span>{props.movie.Country || '?'}</span>
                    </div>
                    <div 
                        className={classes.Menu__info__subtitle}>
                        <span>Rating: </span>
                        <span style={{color: props.movie.imdbRating <7.5 ? 'red':'yellowgreen'}}>{props.movie.imdbRating? props.movie.imdbRating : '?'}</span>
                    </div>
        </div>
    )

    let renderInfo2 = ( props.type === 'plot' && menuOpen &&
        <div className={classes.Menu__info__background}>

                    <div className={classes.Menu__info__subtitle}>
                        <span style={{color:'pink',fontWeight:'bolder'}}>Plot: </span><span>{props.movie.Plot || 'N/A'}</span>
                    </div>
        </div>
    )


    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        // console.log('now',menuOpen);
    };

    return (
        <div className={classes.Menu} onClick={toggleMenu}>
                <div className={classes.Menu__selection}>
                    <div className={classes.Menu__Title}>{props.name}</div>
                </div>
            {renderInfo1 || renderInfo2}
        </div>
    );
}
 
export default TextMenu;