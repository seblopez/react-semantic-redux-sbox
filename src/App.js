import React, { Component } from "react";
import { connect } from "react-redux";
import {Sidebar, Menu, Grid, Header} from "semantic-ui-react";
import {Router, Route, Switch } from "react-router-dom";
import VendorList from "./components/vendors/VendorList";
import VendorCreate from "./components/vendors/VendorCreate";
import VendorEdit from "./components/vendors/VendorEdit";
import GoogleAuth from "./components/auth/GoogleAuth";
import {hideMenu, showMenu} from "./actions";
import history from "./history";

import "./menu/menu.css"
import Home from "./home";

class App extends Component {

    renderUser() {
        if(!this.props.userProfile) {
            return(
              <Header content='Please sign in' size='small' />
            );
        }
        return(
            <Header size='tiny'>
                {`Welcome ${this.props.userProfile.sV}!`}
            </Header>
        );
    }

    renderMenus() {
        if(!this.props.userProfile) {
            return(
                <Sidebar
                    as={Menu}
                    animation='overlay'
                    inverted
                    vertical
                    visible={this.props.menuVisible}
                    width='thin'
                >
                    <GoogleAuth />
                </Sidebar>);
            }

        return(
            <Sidebar
                as={Menu}
                animation='overlay'
                inverted
                vertical
                onHide={() => this.props.dispatch(hideMenu())}
                visible={this.props.menuVisible}
                width='thin'
            >
                <Menu.Item
                    as='a'
                    href='/'
                    onClick={() => this.props.dispatch(hideMenu())}
                    icon='home'
                    content='Home'
                />
                <Menu.Item
                    as='a'
                    href='/vendor/list'
                    onClick={() => this.props.dispatch(hideMenu())}
                    icon='address book outline'
                    content='Vendors'
                />
                <GoogleAuth />
            </Sidebar>
    );
    }

    render() {
        return (
                <div>
                    {this.renderMenus()}
                    <Sidebar.Pushable>
                        <Sidebar.Pusher>
                            <Grid columns={2}>
                                <Grid.Column width={14}>
                                    <Menu
                                        size='small'
                                        inverted
                                        compact
                                        onClick={() => this.props.dispatch(showMenu())}
                                        className='no-border-radius'
                                    >
                                        <Menu.Item
                                            as='a'
                                            icon='bars'
                                        />
                                    </Menu>
                                </Grid.Column>
                                <Grid.Column
                                    width={2}
                                    textAlign='left'
                                    verticalAlign='middle'>
                                    {this.renderUser()}
                                </Grid.Column>
                            </Grid>
                        </Sidebar.Pusher>
                        <Router history={history}>
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <Route path="/vendor/list" component={VendorList} />
                                <Route path="/vendor/new" component={VendorCreate} />
                                <Route path="/vendor/edit/:id" component={VendorEdit} />
                            </Switch>
                        </Router>
                    </Sidebar.Pushable>
                </div>

        );
    }
}

App = connect(state => {
    const menuVisible = state.menuVisible.menuVisible;
    const userProfile = state.auth.userProfile;
    return { menuVisible, userProfile };
})(App);

export default App;
