import React, {Component} from 'react';
import {connect} from 'react-redux'

import Aux from "../../hoc/Auxiliar";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import * as actionsBuilder from '../../store/actions/index';
import axios from '../../http/axios-order';

class BurgerBuilder extends Component {
    state = {
        showPurchaseModal: false,
    };

    componentDidMount() {
        // console.log(this.props);
        this.props.onInitIngredients();
    };

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
        .map((value, index) => {
            return ingredients[value];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
        return sum > 0;
    };

    purchaseHandler = () => {
        this.setState({showPurchaseModal: true})
    };

    purchaseCancelHandler = () => {
        this.setState({showPurchaseModal: false})
    };

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    };

    render() {
        const disabledInfo = {
                ...this.props.ings
            };

        for (let key of Object.keys(disabledInfo)) {
            disabledInfo[key] = disabledInfo[key] <= 0;
            /*
            * { salad: true, meat: false, bacon: true }
            * */
        }

        let orderSummary = null;
        //Loading spinner while GET ingredients
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner/>;

        if (this.props.ings) {
            console.log('burgerbuilder totalprice', this.props.totalPrice);
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                        ingredientAdded={this.props.onAddIngredients}
                        ingredientRemove={this.props.onRemoveIngredients}
                        disable={disabledInfo}
                        price={this.props.totalPrice}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        modalPurchase={this.purchaseHandler}
                    />
                </Aux>
            );

            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                purchaseCancel={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}
                price={this.props.totalPrice}
            />;
        }

        return (
            <Aux>
                <Modal
                    modal={this.state.showPurchaseModal}
                    exitModal={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.price,
        error: state.burgerBuilder.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredients: (ingName) => dispatch(actionsBuilder.addIngredients(ingName)),
        onRemoveIngredients: (ingName) => dispatch(actionsBuilder.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actionsBuilder.initIngredients()),
        onInitPurchase: () => dispatch(actionsBuilder.purchaseInit() )
    }
};

//wrapped from a high level component
export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));
