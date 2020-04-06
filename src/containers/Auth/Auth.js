import React, {Component} from 'react';

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from './Auth.css';

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
        }
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

    inputValueChangedHandler = (event, controlName) => {
        // const updatedAuthForm = {
        //     ...this.state.authForm
        // };
        // const updatedFormElement = {
        //     ...updatedAuthForm[controlName]
        // };

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

        // updatedFormElement.value = event.target.value;
        // updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        // updatedFormElement.touched = true;
        // updatedAuthForm[controlName] = updatedFormElement;
        //
        // let formIsValidation = true;
        // for (let controlName in updatedAuthForm) {
        //     formIsValidation = updatedAuthForm[controlName].valid && formIsValidation;
        // }
        // this.setState({authForm: updatedAuthForm, formIsValid: formIsValidation});
    };

    authHandler = (event) => {
        event.preventDefault();
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

        return (
            <div className={classes.Auth}>
                <form action="">
                    {form}
                    <Button btnType='Success' disabled={!this.state.formIsValid}>
                        SUBMIT
                    </Button>
                </form>
            </div>
        );
    }
}

export default Auth;