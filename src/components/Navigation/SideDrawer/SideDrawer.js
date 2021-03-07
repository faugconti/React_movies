import React,{Fragment} from 'react';
import Backdrop from '../../UI/Backdrop/Backdrop';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';


const sideDrawer = (props) => {

    let attachedClasses = !props.open ? [classes.SideDrawer,classes.Close] : 
                            [classes.SideDrawer,classes.Open];
    
    return (
        <Fragment>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                <nav className={classes.items} >
                    <NavigationItems isAuthenticated={props.isAuth} />
                </nav>
                <div className={classes.Logo}></div>
            </div>
        </Fragment>
    );
}
 
export default sideDrawer;