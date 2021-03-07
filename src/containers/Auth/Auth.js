import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import ErrorModal from '../../components/UI/Modal/ErrorModal';
import * as actions from '../../store/actions/index';
import classes from './Auth.module.css';

class Auth extends Component {
    constructor(props) {
        super(props)
        this.state = {
            controls: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Name'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 1
                    },
                    valid: false,
                    touched: false,
                    usedInLogin: false
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Email Address'
                    },
                    value: '',
                    validation: {
                        required: true,
                        isEmail: true
                    },
                    valid: false,
                    touched: false,
                    usedInLogin: true
                },
                password: {
                    elementType: 'password',
                    elementConfig: {
                        type: 'password',
                        placeholder: 'Password'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 6
                    },
                    valid: false,
                    touched: false,
                    usedInLogin: true
                }
            },
            valid: false,
            isSignUp: false
        }
    }


    componentDidMount() {
        //si no estoy logeado redirect a '
    }
    checkFormValidity = () => {
        return new Promise((resolve, reject) => {
            let formIsValid = true;

            for (let key in this.state.controls) {
                if (!this.state.isSignUp) { //login?
                    if (this.state.controls[key].usedInLogin === false) {
                        continue
                    }
                }
                formIsValid = formIsValid && this.state.controls[key].valid
            }
            resolve(formIsValid);
        })
    }

    checkValidity(value, rules) {
        let isValid = true;

        if (!rules) {
            return true;
        }
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid;
        }
        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid;
        }
        return isValid;
    }

    submitHandler = (event) => {
        event.preventDefault();
        const objectData = {
            email: this.state.controls.email.value,
            password: this.state.controls.password.value
        }
        if (this.state.isSignUp) {
            objectData.name = this.state.controls['name'].value
        }
        this.props.onAuth(
            objectData,
            this.state.isSignUp
        );
    }

    switchAuthMode = () => {
        // console.log('[AUTH] SwitchAuthMode')
        // console.log(this.state.isSignUp)
        return this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp
            }
        }, () => {
            this.checkFormValidity()
                .then(isValid => {
                    this.setState({ valid: isValid })
                })
        })
    };

    inputChangedHandler = (event, controlName) => {
        // console.log('[AUTH] inputChange')
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value,
                    this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({ controls: updatedControls }, () => {
            this.checkFormValidity()
                .then(isValid => {
                    this.setState({ valid: isValid })
                })
        })
    };

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            if (!this.state.isSignUp) {
                if (this.state.controls[key].usedInLogin === false) {
                    continue
                }
            }
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            console.log('authenticated')
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }


        let form = formElementsArray.map(formElement => {
            return (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}
                />
            )
        });

        let redirectionToSignup = (
            <div style={{ marginTop: '1rem' }}>
                <div
                    onClick={this.switchAuthMode}
                    style={{ textDecoration: 'none', color: 'cyan', fontWeight: 'bold',cursor:'pointer' }}
                >
                    {this.state.isSignUp ? 'Login here' : 'Signup here'}
                </div>
            </div>
        );

        let message = "Your credentials"

        if (this.props.loading) {
            form = (
                <div className={classes['center']}>
                    <Spinner />
                </div>
            )
            message = "Connecting to server...";
        }


        return (
            <div className={classes.Auth}>
                <ErrorModal error={this.props.error}
                    onClear={this.props.onAuthReset}
                />
                {authRedirect}
                <div className={classes.Title}>
                    {message}
                </div>
                <form onSubmit={this.submitHandler} >
                    {form}
                    {!this.props.loading &&
                        <div className={classes['center']}>
                            <div className={classes['image1']}></div>
                            <div>
                                <Button
                                    disabled={!this.state.valid}
                                    color='CYAN'
                                    size={'SMALL'}
                                >
                                    {this.state.isSignUp ? 'Register' : 'Login'}
                                </Button>
                                {redirectionToSignup}
                            </div>
                        </div>
                    }
                </form>
            </div>
        )

    }
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuthReset: () => dispatch(actions.authReset()),
        onAuth: (authData, isSignup) => dispatch(actions.auth(authData, isSignup)),
        onSetAuthRedirect: path => dispatch(actions.setAuthRedirectPath(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);