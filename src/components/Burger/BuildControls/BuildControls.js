import classes from './BuildControls.css';
import React from 'react';
import BuildControl from "./BuildControl/BuildControl";

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Meat', type: 'meat'},
];

const BuildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current price: <strong>{props.price}</strong></p>
        {
            controls.map(ctrl => (
                <BuildControl
                    key={ctrl.label}
                    label={ctrl.label}
                    add={() => {
                        props.ingredientAdded(ctrl.type)
                    }}
                    rmv={() => {
                        props.ingredientRemove(ctrl.type)
                    }}
                    disable={props.disable[ctrl.type]}
                />
            ))
        }
        <button
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.modalPurchase}
        >
            { props.isAuthenticated ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
        </button>
    </div>
);

export default BuildControls;
