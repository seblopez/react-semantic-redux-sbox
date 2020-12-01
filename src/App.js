import React, { Component } from "react";
import { connect } from "react-redux";
import VendorForm from "./components/VendorForm";
import {Sidebar, Menu, Grid, Header} from "semantic-ui-react";
import {HIDE_MENU, SHOW_MENU} from "./actions/types";
import GoogleAuth from "./components/auth/GoogleAuth";

class VendorFormContainer extends Component {
    submit = values => {
        window.alert(JSON.stringify(values, null, 2));
        console.log(JSON.stringify(values, null, 2));
    };

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
                    onHide={() => this.props.dispatch({type: HIDE_MENU})}
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
                onHide={() => this.props.dispatch({type: HIDE_MENU})}
                visible={this.props.menuVisible}
                width='thin'
            >
                <Menu.Item
                    as='a'
                    onClick={() => this.props.dispatch({type: HIDE_MENU})}
                    icon='home'
                    content='Home'
                />
                <Menu.Item
                as='a'
                onClick={() => this.props.dispatch({type: HIDE_MENU})}
                icon='address book outline'
                content='Vendors'
                />
                <GoogleAuth />
            </Sidebar>
    );
    }

    getInitialValues() {
    }

    render() {
        return (
            <Sidebar.Pushable>
                {this.renderMenus()}
                <Sidebar.Pusher>
                    <Grid columns={2}>
                        <Grid.Column width={14}>
                            <Menu
                                size='small'
                                inverted
                                compact
                                onClick={() => this.props.dispatch({type: SHOW_MENU})}
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
                    <VendorForm
                        onSubmit={this.submit}
                        initialValues={this.getInitialValues()}
                    />
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        );
    }
}

VendorFormContainer = connect(state => {
    const menuVisible = state.menuVisible.menuVisible;
    const userProfile = state.auth.userProfile;
    return { menuVisible, userProfile };
})(VendorFormContainer);

export default VendorFormContainer;
