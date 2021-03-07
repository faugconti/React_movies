import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {HashRouter as Router} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';


import thunk from 'redux-thunk';
import { compose, combineReducers,createStore, applyMiddleware } from 'redux';
import { Provider} from 'react-redux';
import AuthReducer from './store/reducers/auth';
import MovieReducer from './store/reducers/movies';

export const APIKey = `${process.env.REACT_APP_MOVIES_API}`;
export const BACKEND_URL = `${process.env.REACT_APP_BACKEND_URL}`;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 
                        || compose;
                        
const rootReducer = combineReducers({
    auth: AuthReducer,
    movies: MovieReducer
})

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk)))

const app = (
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
);


ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();