import React from 'react';
import classes from './Input.css';

const Input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];
    let validationError = null;
    // console.log(props.elementType);

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
        validationError = <p className={classes.ValidationError}>
            Please add the correct {props.errorMessage}
        </p>;
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                {...props.elementConfig}
                className={inputClasses.join(' ')}
                value={props.value}
                onChange={props.changed}
            />;
            break;
        case ('textarea'):
            inputElement = <textarea
                {...props.elementConfig}
                className={inputClasses.join(' ')}
                value={props.value}
                onChange={props.changed}
            />;
            break;
        case ('select'):
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}
                >
                    {props.elementConfig.options.map(option => {
                        return (
                            <option
                                value={option.value}
                                key={option.value}
                            >
                                {option.displayValue}
                            </option>
                        );
                    })}
                </select>
            );
            break;
        default:
            inputElement = <input
                {...props.elementConfig}
                className={inputClasses.join(' ')}
                value={props.value}
                onChange={props.changed}

            />;
            break;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );
};

export default Input;