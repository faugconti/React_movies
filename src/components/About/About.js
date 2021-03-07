import React from 'react';
import classes from './About.module.css';
import { withRouter } from "react-router-dom";

const about = (props) => {

    const goToOmdb = () => {
        // console.log(props);
        window.location.replace('https://www.omdbapi.com/')
    };

    return (
        <div className={classes.Container}>
            <div className={classes.image2}></div>
            <div className={classes.Title}>About this project</div>
            <div className={classes.Description}> 
                This project was made using ReactJS to showcase the Open Movie Database API to get information
                about movies and shows. 
            </div>
            <div className={classes.Description}> 
                And at the same time it served to refresh some concepts like routing, state managment and some CSS styling.
            </div>
            <div onClick={goToOmdb} className={[classes.Description,classes.cursor,classes.space].join(' ')}> 
                You can check the API Here.
            </div>
            <div className={[classes.Description,classes.space].join(' ')}> 
                Note: The FREE api key used in this project might expire someday...
            </div>
            <div className={[classes.Description,classes.space].join(' ')}> 
                Backend dependencies used: NodeJS(Express) + MongoDB
            </div>
            <div className={classes.image1}></div>
        </div>
        
    );
}
 
export default withRouter(about);