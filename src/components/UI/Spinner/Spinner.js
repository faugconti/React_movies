import React from 'react';
import classes from './Spinner.module.css';

const spinner = (props) => (
    
    <div className={classes.lds_ripple}><div></div><div></div></div>
);

export default spinner;