import React from 'react';
import classes from './BuildControl.css'

const BuildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.labelIngredient}>{props.label}</div>
        <button className={classes.Less}
                onClick={props.rmv}
                disabled={props.disable}
        >
            Less
        </button>

        <button className={classes.More}
                onClick={props.add}>
            More
        </button>
    </div>
);

export default BuildControl;

