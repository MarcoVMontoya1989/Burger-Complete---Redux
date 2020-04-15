import React from 'react';
import classes from './Burger.css';
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";

const Burger = props => {
    let transformedIngredients = Object.keys(props.ingredients)
    .map((ingKey) => {
        return [...Array(props.ingredients[ingKey])]
        .map((value, index) => {
            return <BurgerIngredients key={ingKey + index} type={ingKey}/>
        });
    }).reduce((arr, el) => {
        return arr.concat(el);
    }, []);

    if (transformedIngredients.length <= 0) {
        transformedIngredients = <p>Please add an ingredient!</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredients type="bread-top" />
            {/*<BurgerIngredients type="salad" />*/}
            {transformedIngredients}
            <BurgerIngredients type="bread-bottom" />
        </div>
    );
};

export default Burger;