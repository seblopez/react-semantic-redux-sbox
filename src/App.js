import React, { Component } from "react";
import { connect } from "react-redux";
import VendorForm from "./components/VendorForm";
import {Sidebar, Menu, Icon, Segment} from "semantic-ui-react";
import {HIDE_MENU, SHOW_MENU} from "./actions/types";

class VendorFormContainer extends Component {
    submit = values => {
        window.alert(JSON.stringify(values, null, 2));
        console.log(JSON.stringify(values, null, 2));
    };

    getInitialValues() {
    }

    render() {
        return (
            <Sidebar.Pushable>
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
                        onClick={(e, data) => this.props.dispatch({type: HIDE_MENU})}
                    >
                        <Icon name='home'/>
                        Home
                    </Menu.Item>
                    <Menu.Item
                        as='a'
                        onClick={(e, data) => this.props.dispatch({type: HIDE_MENU})}
                    >
                        <Icon name='address book outline'/>
                        Vendors
                    </Menu.Item>
                    <Menu.Item
                        as='a'
                        onClick={(e, data) => this.props.dispatch({type: HIDE_MENU})}
                    >
                        <Icon name='sign out'/>
                        Sign out
                    </Menu.Item>
                </Sidebar>
                <Sidebar.Pusher>
                    <Menu
                        size='large'
                        inverted
                        compact
                        onClick={(e, data) => this.props.dispatch({type: SHOW_MENU})}
                        className='no-border-radius'
                    >
                        <Menu.Item
                            as='a'
                            icon='bars'
                        />
                    </Menu>
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
        return { menuVisible };
    }
)(VendorFormContainer);

export default VendorFormContainer;
