import React, {Component} from 'react';
import classes from './Modal.css'
import Backdrop from "../Backdrop/Backdrop";
import Aux from "../../../hoc/Auxiliar";

// const Modal = (props) => {
//     return (
//         <Aux>
//             <Backdrop show={props.modal} clicked={props.exitModal}/>
//             <div
//                 className={classes.Modal}
//                 style={{
//                     transform: props.modal ? 'translateY(0)' : 'translateY(-100vh)',
//                     opacity: props.modal ? '1' : '0'
//                 }}
//             >
//                 {props.children}
//             </div>
//         </Aux>
//     );
// };
//

class Modal extends Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.modal !== this.props.modal || nextProps.children !== this.props.children
    }

    componentWillUpdate() {
    }

    render() {
        return (
            <Aux>
                <Backdrop show={this.props.modal} clicked={this.props.exitModal}/>
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.modal ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.modal ? '1' : '0'
                    }}
                >
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}

export default Modal;