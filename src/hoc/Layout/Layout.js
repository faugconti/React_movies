import React from 'react';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {Fragment, Component} from 'react';
import classes from './Layout.module.css';


import {connect} from 'react-redux';

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideDrawer:false,
        }
        this.sideDrawerClosedHandler = this.sideDrawerClosedHandler.bind(this);
        this.sideDrawerToggleHandler = this.sideDrawerToggleHandler.bind(this);
    }
    sideDrawerClosedHandler(){
        this.setState({showSideDrawer:false});
    };

    sideDrawerToggleHandler(){
        // console.log('sideDrawer toggled');
        this.setState((prevState) => {
            return {
                showSideDrawer: !prevState.showSideDrawer
            }
        });
    };
    
    render() { 
        return (
            <Fragment>
                <Toolbar 
                    isAuth = {this.props.isAuthenticated}
                    drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer 
                    isAuth = {this.props.isAuthenticated}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} />
                <div className={classes.content}>
                    {this.props.children}
                </div>
            </Fragment>
            
        );
    }
}
 
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
};


export default connect(mapStateToProps)(Layout);