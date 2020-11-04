import React, { Component } from "react";
import { connect } from "react-redux";
import {FieldArray, reduxForm, arrayPush, change, formValueSelector, arrayRemove} from "redux-form";
import { contacts } from "./fields";
import { Form, Button, Grid } from "semantic-ui-react";
import {
    required,
    minLength,
    maxLength,
    matchesPassword,
    asyncValidate
} from "../validations";
import "./RegisterForm.css";
import "./styled";

class RegisterForm extends Component {
    componentWillMount() {
        this.props.initialize({ contacts: [{firstName: 'Jonas', lastName: 'Kahnwald' }, {firstName: 'Martha', lastName: 'Nielsen'}] });
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <Form onSubmit={handleSubmit}>
                <FieldArray name="contacts" component={contacts} dispatchers={this.props} />
            </Form>
        );
    }
}

const mapDispatchToProps = {
    // NOTE: This MUST be aliased or it will not work
    pushArray: arrayPush,
    updateCheckBoxes: change,
    removeRow: arrayRemove
};

RegisterForm = reduxForm({
    form: "register",
    asyncValidate,
    asyncBlurFields: ["username"]
})(RegisterForm);

export default connect(
    null,
    mapDispatchToProps
)(RegisterForm);
