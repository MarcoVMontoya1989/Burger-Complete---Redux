import React, {Component} from 'react';
import {connect} from 'react-redux';

import axios from '../../http/axios-order';
import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as orderBuilder from '../../store/actions/index';

class Orders extends Component {
    componentDidMount() {
        this.props.onOrderInit(this.props.token, this.props.userId);
    };

    render() {
        let order = <Spinner/>;

        if (!this.props.loading) {
            order = this.props.orders.map(order => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}/>)
            )
        }

        return (
            <div>
                {order}
            </div>
        );
    }
}

const mapPropsToState = (state) => {
    return {
        orders: state.orderBuilder.orders,
        loading: state.orderBuilder.loading,
        token: state.authBuilder.token,
        userId: state.authBuilder.userId
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onOrderInit: (token, userId) => dispatch(orderBuilder.fetchOrder(token, userId))
    }
};


export default connect(mapPropsToState, mapDispatchToProps)(WithErrorHandler(Orders, axios));