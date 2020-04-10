import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Redirect} from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from './Auth.css';

import * as authBuilder from '../../store/actions/index';

class Auth extends Component {
    state = {
        authForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your e-mail',
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false,
                valueType: 'Email'
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                },
                valid: false,
                touched: false,
                valueType: 'Password min length 6 characters'
            },
        },
        isSignUp: false
    };

    checkValidity = (value, rules) => {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
        // console.log(isValid);

        return isValid;
    };

    componentDidMount(): void {
        if (!this.props.isBuildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    inputValueChangedHandler = (event, controlName) => {
        const updateControls = {
            ...this.state.authForm,
            [controlName]: {
                ...this.state.authForm[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.authForm[controlName].validation),
                touched: true,
            }
        };

        this.setState({authForm: updateControls});
    };

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignUp: !prevState.isSignUp}
        })
    };

    submitHandler = (event) => {
        event.preventDefault();

        this.props.onAuthStart(
            this.state.authForm.email.value,
            this.state.authForm.password.value,
            this.state.isSignUp
        );

        const formData = {};

        for (let formElementIdentifier in this.state.authForm) {
            formData[formElementIdentifier] = this.state.authForm[formElementIdentifier].value;
        }
    };

    render() {
        const formElementsArray = [];

        for (let key in this.state.authForm) {
            formElementsArray.push({
                id: key,
                config: this.state.authForm[key],
            })
        }

        let form = (
            formElementsArray.map(formElement => (
                <Input
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    key={formElement.id}
                    changed={(event) => this.inputValueChangedHandler(event, formElement.id)}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    errorMessage={formElement.config.valueType}
                />
            ))
        );

        if (this.props.loading) {
            form = (
                <Spinner/>
            )
        }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (
              <p>{this.props.error.message}</p>
            );
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = (
                <Redirect to={this.props.authRedirectPath} />
            )
        }
        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType='Success' >
                        SUBMIT
                    </Button>
                </form>
                <Button btnType='Danger' clicked={this.switchAuthModeHandler}>
                    SWITCH TO {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}
                </Button>
            </div>
        );
    }
}

const mapPropsToState = state => {
    return {
        loading: state.authBuilder.loading,
        error: state.authBuilder.error,
        isAuthenticated: state.authBuilder.token != null,
        isBuildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.authBuilder.authRedirectPath
    }
};

const mapDispatchToProps = (dispatch) => {
  return {
      onAuthStart: (email, password, isSignUp) => dispatch(authBuilder.auth(email, password, isSignUp)),
      onSetAuthRedirectPath: () => dispatch(authBuilder.setAuthRedirectPath('/'))
  }
};

export default connect(mapPropsToState, mapDispatchToProps)(Auth);