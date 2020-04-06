// import React, { Component } from 'react';
//
// import Order from '../../components/Order/Order';
// import axios from '../../http/axios-order';
// import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
//
// class Orders extends Component {
//     state = {
//         orders: [],
//         loading: true
//     };
//
//     componentDidMount() {
//         axios.get('/orders.json')
//             .then(res => {
//                 const fetchedOrders = [];
//                 for (let key in res.data) {
//                     fetchedOrders.push({
//                         ...res.data[key],
//                         id: key
//                     });
//                 }
//                 this.setState({loading: false, orders: fetchedOrders});
//             })
//             .catch(err => {
//                 this.setState({loading: false});
//             });
//     }
//
//     render () {
//         return (
//             <div>
//                 {this.state.orders.map(order => (
//                     <Order
//                         key={order.id}
//                         ingredients={order.ingredients}
//                         price={order.price} />
//                 ))}
//             </div>
//         );
//     }
// }
//
// export default withErrorHandler(Orders, axios);

import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from '../../http/axios-order';
import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as orderBuilder from '../../store/actions/index';

class Orders extends Component {
    // state = {
    //     orders: [],
    //     loading: true,
    // };

    componentDidMount() {
        // axios.get('/orders.json').then(result => {
        //     console.log(result.data);
        //     const fetchedOrders = [];
        //
        //     for (let key in result.data) {
        //         fetchedOrders.push({
        //             ...result.data[key],
        //             id: key,
        //             });
        //     }
        //
        //     this.setState({
        //         loading: false,
        //         orders: fetchedOrders,
        //     });
        // }).catch(error => {
        //     this.setState({loading: false});
        // })
        this.props.onOrderInit();
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
        loading: state.orderBuilder.loading
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onOrderInit: () => dispatch(orderBuilder.fetchOrder())
    }
};


export default connect(mapPropsToState, mapDispatchToProps)(WithErrorHandler(Orders, axios));