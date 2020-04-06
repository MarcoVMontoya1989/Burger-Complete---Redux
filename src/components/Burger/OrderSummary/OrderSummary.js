// import React from 'react';
// import Aux from "../../../hoc/Auxiliar";
// import Button from "../../UI/Button/Button";
//
// const OrderSummary = (props) => {
//     const ingredientsSummary = Object.keys(props.ingredients).map((ingKey, index) => {
//         return (
//             <li key={ingKey}>
//                 <span style={{textTransform: 'capitalize'}}>{ingKey}</span>:
//                 {props.ingredients[ingKey]}
//             </li>
//         );
//     });
//     return (
//         <Aux>
//             <h3>Your Order</h3>
//             <p>A delicious burger with the following ingredients:</p>
//             <ul>
//                 {ingredientsSummary}
//             </ul>
//             <p>Total Price: {props.price}</p>
//             <p>Continue to Checkout?</p>
//             <Button btnType='Success' clicked={props.purchaseContinue}>Continue</Button>
//             <Button btnType='Danger' clicked={props.purchaseCancel}>Cancel</Button>
//
//         </Aux>
//     );
// };
//
// export default OrderSummary;

import React, {Component} from 'react';
import Aux from "../../../hoc/Auxiliar";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
    componentWillUpdate() {
        console.log('[OrderSummary willUpdate]');
    }

    render() {
        const ingredientsSummary = Object.keys(this.props.ingredients)
        .map((ingKey, index) => {
            return (
                <li key={ingKey}>
                    <span style={{textTransform: 'capitalize'}}>{ingKey}</span>:
                    {this.props.ingredients[ingKey]}
                </li>
            );
        });
        return (
            <div>
                <Aux>
                    <h3>Your Order</h3>
                    <p>A delicious burger with the following ingredients:</p>
                    <ul>
                        {ingredientsSummary}
                    </ul>
                    <p>Total Price: {this.props.price}</p>
                    <p>Continue to Checkout?</p>
                    <Button btnType='Success' clicked={this.props.purchaseContinue}>Continue</Button>
                    <Button btnType='Danger' clicked={this.props.purchaseCancel}>Cancel</Button>
                </Aux>
            </div>
        );
    }
}

export default OrderSummary;