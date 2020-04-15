import React, {Component} from 'react';
import {Route, Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };

    checkoutAcceptedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    render() {
        let summary = <Redirect to={"/"}/>;

        if (this.props.ings) {
            const purchaseRedirect = this.props.purchased ? <Redirect to={"/"}/> : null;
                summary = (
                <div>
                    {purchaseRedirect }
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutAccepted={this.checkoutAcceptedHandler}
                    />
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData}
                    />
                </div>
            );
        }
        return (
            <div>
                {summary}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.orderBuilder.price,
        purchased: state.orderBuilder.purchased
    }
};

export default connect(mapStateToProps)(Checkout);