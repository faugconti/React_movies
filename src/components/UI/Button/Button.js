import React from 'react';

import classes from './Button.module.css';

const button = props => {
    return (
        <button 
            disabled={props.disabled}
            style={props.classStyle}
            className={[classes.Button,classes[props.btnType],classes[props.size],classes[props.color]].join(' ')}
            onClick={props.clicked}
        >
            {props.children}
        </button>
    );
};

export default button;