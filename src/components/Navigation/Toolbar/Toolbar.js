import React from 'react';
import classes from './Toolbar.module.css';
import DrawToggle from '../SideDrawer/DrawToggle/DrawToggle';
import NavigationItems from '../NavigationItems/NavigationItems';
import {withRouter} from 'react-router-dom';

const toolbar = (props) => {

    const redirectHome = () => {
        if(props.location.pathname!=="/"){
            // console.log('redirecting to home')
            props.history.push('/');
        }
    };

    return (
        <nav className={classes.navbar}>
            <div onClick={redirectHome} className={classes.title}>MovieSearch</div>
            <div className={classes.DrawerToggle}>
                <DrawToggle clicked={props.drawerToggleClicked} />
            </div>
            <div className={classes.desktop_only}>
                <NavigationItems isAuthenticated={props.isAuth} />
            </div>
        </nav>
    );
}
 
export default withRouter(toolbar);
 
