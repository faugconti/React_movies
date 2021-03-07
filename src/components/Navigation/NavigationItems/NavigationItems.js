import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const navigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem exact link="/">Random</NavigationItem>
            <NavigationItem link="/Search">Search</NavigationItem>
            {props.isAuthenticated && 
                <NavigationItem link="/Favorites">Favorites</NavigationItem>
            }
            {!props.isAuthenticated && 
                <NavigationItem link="/Login">Login</NavigationItem>
            }
            {props.isAuthenticated && 
                <NavigationItem link="/Logout">Logout</NavigationItem>
            }
            
            <NavigationItem link="/about">About</NavigationItem>
            {/* <NavigationItem>Login</NavigationItem> */}
        </ul>
    );
}
 
export default navigationItems;