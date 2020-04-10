import React, {Component} from 'react';
import {connect} from 'react-redux';

import Aux from "../../hoc/Auxiliar";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import classes from './Layout.css';

class Layout extends Component {
    state = {
        showSideDrawer: false
    };

    sideDrawerCloseHandler = () => {
        this.setState({showSideDrawer: false});
    };

    sideDrawerToggleHandler = () => {
      this.setState((prevState) => {
          return {showSideDrawer: !prevState.showSideDrawer};
      });
    };

    render() {
        return (
            <Aux>
                <Toolbar
                    isAuth={this.props.isAuthenticated}
                    clicked={this.sideDrawerToggleHandler}/>
                <SideDrawer
                    isAuth={this.props.isAuthenticated}
                    clickClose={this.sideDrawerCloseHandler}
                    open={this.state.showSideDrawer}
                />
                {/*<div>Toolbar, SideDrawer, Backdrop</div>*/}
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }

}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authBuilder.token !== null
    };
};

export default connect(mapStateToProps)(Layout);
