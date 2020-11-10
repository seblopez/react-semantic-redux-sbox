import React, { Component } from "react";
import { connect } from "react-redux";
import {Field, FieldArray, reduxForm, arrayPush, change, formValueSelector} from "redux-form";
import { contacts } from "./fields";
import { Form, Grid, Button, Tab } from "semantic-ui-react";
import {
    validate
} from "../validations";
import "./RegisterForm.css";
import "./styled";
import { errorRenderer } from "./errors";

const specialtyOptions = [
    { key: 'gas', text: 'Gas', value: '1233d3dde' },
    { key: 'electricity', text: 'Electricity', value: '1233d3dda' },
    { key: 'plumbing', text: 'Plumbing', value: '1232d3eda' },
    { key: 'painting', text: 'Painting', value: '14321e3sd' }
];

const panes = props => [
    { menuItem: { key: 'users', icon: 'users', content: 'Contacts' }, render: () => <Tab.Pane><Contacts props={props}/></Tab.Pane>},
    { menuItem: { key: 'location', icon: 'location arrow', content: 'Locations' }, render: () => <Tab.Pane>Tab 2 Content</Tab.Pane>}
];

const Contacts = props => {
    return (
        <Grid>
            <Grid.Column>
                <FieldArray name="contacts" component={contacts} dispatchers={props} />
            </Grid.Column>
        </Grid>);
}

const tabs = props => <Tab panes={ panes(props) } />;

class RegisterForm extends Component {
    componentDidMount() {
        /*
        this.props.initialize({
            name: 'Ovelar Hnos.',
            specialties: [ '1233d3dde', '1232d3eda'],
            contacts: [
                { firstName: 'Jonas', lastName: 'Kahnwald', role: 'ow' },
                { firstName: 'Martha', lastName: 'Nielsen', role: 'tc' }
                ]
        });
        */
    }

    renderInput = ({ name, label, required, placeholder, meta, input }) => {
        return(
            <Form.Input
                name={name}
                label={label}
                required={required}
                placeholder={placeholder}
                value={input.value}
                onChange={(e, {value}) => input.onChange(value)}
                error={errorRenderer(meta, required)}
            />
        )
    };

    renderDropdown = ({ name, label, required, placeholder, options, meta, input }) => {
        return (
            <Form.Dropdown
                clearable
                label={label}
                name={name}
                search
                fluid
                multiple
                selection
                onChange={(e, { value }) => input.onChange(value)}
                options={options}
                placeholder={placeholder}
                value={input.value || []}
                required={required}
                error={errorRenderer(meta, required)}
            />
        );
    }

    onSubmit = values => {
        console.log('Submitting...')
        this.props.onSubmit(values);
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit} noValidate>
                <Grid>
                    <Grid.Column width={4}>
                        <Field
                            name="name"
                            component={this.renderInput}
                            label="Name"
                            placeholder="Select a Vendor name..."
                            required={true}
                        />
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Field
                            name="specialties"
                            label="Specialties"
                            component={this.renderDropdown}
                            required={true}
                            placeholder="Select the Vendor's specialties..."
                            options={specialtyOptions}
                        />
                    </Grid.Column>
                </Grid>
                <Grid>
                    <Grid.Column>
                        {tabs(this.props)}
                    </Grid.Column>
                </Grid>
                <Grid>
                    <Grid.Column>
                        <Button primary>
                            Submit
                        </Button>
                    </Grid.Column>
                </Grid>
            </Form>
        );
    }
}

const mapDispatchToProps = {
    // NOTE: This MUST be aliased or it will not work
    pushArray: arrayPush,
    updateCheckBoxes: change,
    updateContacts: change
};

RegisterForm = reduxForm({
    form: "register",
    touchOnChange: true,
    validate
})(RegisterForm);

const selector = formValueSelector('register');

RegisterForm = connect(state => {
    const contacts = selector(state, 'contacts');
    return { contacts };
})(RegisterForm);

export default connect(
    null,
    mapDispatchToProps
)(RegisterForm);
