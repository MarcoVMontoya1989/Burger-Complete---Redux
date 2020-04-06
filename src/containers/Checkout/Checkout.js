import React, {Component} from 'react';
import {Route, Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import * as orderAction from '../../store/actions/index';


class Checkout extends Component {
    // state = { //removed, to use Redux Core State
    //     // ingredients: {
    //     //     salad: 0,
    //     //     bacon: 1,
    //     //     cheese: 0,
    //     //     meat: 1
    //     // },
    //     ingredients: null,
    //     totalPrice: 0,
    // };
    // componentWillMount() { //removed to use the Redux
    //     const queryURL = new URLSearchParams(this.props.location.search);
    //     const ingredientsNew = {};
    //     let priceBurger = 0;
    //
    //     for (let param of queryURL.entries()) {
    //         // ['salad', 1, ...]
    //         if (param[0] === 'price') {
    //             priceBurger = param[1];
    //         } else {
    //             ingredientsNew[param[0]] = +param[1];
    //         }
    //     }
    //     console.log('before', ingredientsNew);
    //     this.setState({ingredients: ingredientsNew, price: priceBurger});
    //     console.log('after', this.state);
    // };

    // componentWillMount () {
    //     const query = new URLSearchParams( this.props.location.search );
    //     const ingredients = {};
    //     let price = 0;
    //
    //     for ( let param of query.entries() ) {
    //         // ['salad', '1']
    //         if (param[0] === 'price') {
    //             price = param[1];
    //         } else {
    //             ingredients[param[0]] = +param[1];
    //         }
    //         console.log(param)
    //     }
    //
    //     this.setState( { ingredients: ingredients, totalPrice: price } );
    //     console.log('HERE SEARCH MARCO', this.state);
    // }
    // componentDidMount() {
    //     const queryURL = new URLSearchParams(this.props.location.search);
    //     const ingredientsNew = {};
    //     let priceBurger = 0;
    //
    //     for (let param of queryURL.entries()) {
    //         // ['salad', 1, ...]
    //         if (param[0] === 'price') {
    //             priceBurger = param[1];
    //         } else {
    //             ingredientsNew[param[0]] = +param[1];
    //         }
    //     }
    //
    //     this.setState({ingredients: ingredientsNew, price: priceBurger});
    // };

    // componentWillMount(): void {
    //     this.props.onInitPurchase();
    // }

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

// const mapDispatchToProps = dispatch => {
//   return {
//       onInitPurchase: () => dispatch(orderAction.purchaseInit())
//   }
// };

export default connect(mapStateToProps)(Checkout);