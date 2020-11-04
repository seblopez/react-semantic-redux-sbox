import React, { Component } from "react";
import RegisterForm from "./components/RegisterForm";

class RegisterFormContainer extends Component {
    submit = values => {
        window.alert(JSON.stringify(values, null, 2));
        console.log(JSON.stringify(values, null, 2));
    };

    getInitialValues() {
        return {
            preference: "spaces",
            newsletter: true
        };
    }

    render() {
        return (
            <RegisterForm
                onSubmit={this.submit}
                initialValues={this.getInitialValues()}
            />
        );
    }
}

export default RegisterFormContainer;
