import React from "react";
import { connect } from "react-redux";

import { signIn, signOut } from "../../actions";
import {Menu} from "semantic-ui-react";
import clientId from "../../config/config";

class GoogleAuth extends React.Component {
    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
    }

    renderAuthMenuItem() {
        if(this.props.isSignedIn === null) {
            return null;
        } else if(this.props.isSignedIn) {
            return (
                <Menu.Item
                    as='a'
                    onClick={this.onSignOutClick}
                    icon='sign out'
                    content='Sign out'
                />
            );
        } else {
            return (
                <Menu.Item
                    as='a'
                    onClick={this.onSignInClick}
                    icon='sign in'
                    content='Sign in'
                />
            );
        }
    }

    componentDidMount() {
        window.gapi.load('client:auth2',
            () => {
                window.gapi.client.init({
                    clientId: clientId,
                    scope: 'email'
                }).then(() => {
                    this.auth = window.gapi.auth2.getAuthInstance();
                    this.onAuthChange(this.auth.isSignedIn.get());
                    this.auth.isSignedIn.listen(this.onAuthChange);
                })
            });
    }

    onAuthChange = isSignedIn => {
        if(isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getBasicProfile());
        } else {
            this.props.signOut()
        }
    };

    render() {
        return this.renderAuthMenuItem();
    }
}

const mapStateToProps = state => {
    return { isSignedIn: state.auth.isSignedIn, userProfile: state.auth.userProfile };
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);