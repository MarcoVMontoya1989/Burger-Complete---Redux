import React from 'react';

import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from './CheckoutSummary.css';

const CheckoutSummary = (props) => {
    // console.log('checkout summary',props);
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well!!</h1>
            <div className={classes.checkBox}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button
                btnType='Success'
                clicked={props.checkoutAccepted}
            >
                Continue
            </Button>
            <Button
                btnType='Danger'
                clicked={props.checkoutCancelled}
            >
                Cancel
            </Button>
        </div>
    );
};

export default CheckoutSummary;