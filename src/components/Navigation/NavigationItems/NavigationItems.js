import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = () => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link='/' exact>Burger Builder</NavigationItem>
            {/*<NavigationItem link='/'>Checkout</NavigationItem>*/}
            <NavigationItem link='/orders'>Orders</NavigationItem>
            {/*<li><a href="/">Foobar</a></li>*/}
            <NavigationItem link='/auth'>Authenticate</NavigationItem>
        </ul>
    );
};

export default NavigationItems;