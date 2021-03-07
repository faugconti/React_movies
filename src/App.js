import React,{Component} from 'react';
import Layout from './hoc/Layout/Layout';
import Random from './containers/Random/Random';
import {Route,Switch,Redirect,withRouter} from 'react-router-dom';
import About from './components/About/About';
import Search from './containers/Search/Search';
import MovieInfo from './components/MovieInfo/MovieInfo';
import Login from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import Favorites from './containers/Favorites/Favorites';

import {connect} from 'react-redux';
import * as actions from './store/actions/index';

class App extends Component {

  componentDidMount(){
    this.props.onTryAutoSignup();
  }

  render(){

    let routes = (
      <Switch>
        <Route path="/about"  component={About} />
        <Route path="/search" component={Search} />
        <Route path="/movie/:id"  component={MovieInfo} />
        <Route path="/login"  component={Login} />
        
        {this.props.isAuthenticated &&
          <Route path="/favorites"  component={Favorites} />
        } 

        {this.props.isAuthenticated &&
          <Route path="/logout"  component={Logout} />
        } 
        <Route path="/" exact component={Random} />
        <Redirect to="/" />
      </Switch>
    );
   
    return (
      <Layout>
        {routes}    
      </Layout>
    );

  };
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
