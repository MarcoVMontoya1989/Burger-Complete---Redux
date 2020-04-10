import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from "../../../components/UI/Button/Button";
import classes from './ContactData.css';
import axios from "../../../http/axios-order";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

import * as orderBuilderActions from '../../../store/actions/index';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                valueType:  'Full Name'
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Address',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                valueType:  'Street'
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP CODE',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 8,
                },
                valid: false,
                touched: false,
                valueType:  'Zip Code'
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                valueType:  'Country',
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'E-mail',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                valueType:  'E-mail'
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'normal', displayValue: 'Normal' },
                        { value: 'cheapest', displayValue: 'Cheapest' },
                    ]
                },
                valid: true,
                value: 'fastest',
                validation: {
                    required: false,
                },
            }
        },
        price: 0,
        formIsValid: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};

        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        const order = {
            ingredients: this.props.ings,
            price: this.props.totalPrice, //.toFixed(2),
            orderData: formData,
        };

        this.props.onOrderBurger(order, this.props.token);

        // axios.post('/orders.json', order).then(res => {
        //     this.setState({loading: false});
        //     this.props.history.push('/');
        // }).catch(error => {
        //     this.setState({loading: false});
        // });
    };

    checkValidity = (value, rules) => {
        let isValid = true;

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
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
        // console.log(isValid);

        return isValid;
    };

    inputValueChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValidation = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValidation = updatedOrderForm[inputIdentifier].valid && formIsValidation;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValidation});
    };

    render() {
        const formElementsArray = [];

        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key],
            })
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => {
                    return (
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
                    );
                })}

                <Button btnType='Success' disabled={!this.state.formIsValid}>
                    ORDER NOW!
                </Button>
            </form>
        );

        if (this.props.loading) {
            form = <Spinner/>
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapPropsToState = (state) => {
  return {
      ings: state.burgerBuilder.ingredients,
      totalPrice: state.burgerBuilder.price,
      loading: state.orderBuilder.loading,
      token: state.authBuilder.token
  }
};

const mapDispatchToProps = dispatch => {
  return {
      onOrderBurger: (orderData, token) => dispatch(orderBuilderActions.purchaseBurger(orderData, token))
  };
};

export default connect(mapPropsToState, mapDispatchToProps)(withErrorHandler(ContactData, axios));