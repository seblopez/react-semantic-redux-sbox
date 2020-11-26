import React, { Component } from "react";
import { connect } from "react-redux";
import {Field, FieldArray, reduxForm, arrayPush, change, formValueSelector} from "redux-form";
import { contactsTab } from "./contacts";
import { Form, Grid, Button, Tab } from "semantic-ui-react";
import {
    validate
} from "../validations";
import "./RegisterForm.css";
import { errorRenderer } from "./errors";
import {locationsTab} from "./locations";

const specialtyOptions = [
    { key: 'gas', text: 'Gas', value: '1233d3dde' },
    { key: 'electricity', text: 'Electricity', value: '1233d3dda' },
    { key: 'plumbing', text: 'Plumbing', value: '1232d3eda' },
    { key: 'painting', text: 'Painting', value: '14321e3sd' }
];

const panes = props => [
    { menuItem: { key: 'users', icon: 'users', content: 'Contacts' }, render: () => <Tab.Pane><Contacts props={props}/></Tab.Pane>},
    { menuItem: { key: 'location', icon: 'location arrow', content: 'Locations' }, render: () => <Tab.Pane><Locations props={props} /></Tab.Pane>}
];

const Contacts = props => {
    return(
        <Grid>
            <Grid.Column>
                <FieldArray name="contacts" component={contactsTab} dispatchers={props} />
            </Grid.Column>
        </Grid>);
}

const Locations = props => {
    return(
        <Grid>
            <Grid.Column>
                <FieldArray name="locations" component={locationsTab} dispatchers={props} />
            </Grid.Column>
        </Grid>

    );
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

    onSubmit = values => this.props.handleSubmit(values);

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
    updateContacts: change,
    updateLocations: change,
    updateRows: change
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

RegisterForm = connect(state => {
    const locations = selector(state, 'locations');
    return { locations };
})(RegisterForm);

RegisterForm = connect(state => {
    const contactsActivePage = state.contactPagination.contactsActivePage;
    const contactsTotalPages = state.contactPagination.contactsTotalPages;
    const contactsPageSize = state.contactPagination.contactsPageSize;
    return { contactsActivePage, contactsPageSize, contactsTotalPages };
})(RegisterForm)

RegisterForm = connect(state => {
    const locationsActivePage = state.locationPagination.locationsActivePage;
    const locationsTotalPages = state.locationPagination.locationsTotalPages;
    const locationsPageSize = state.locationPagination.locationsPageSize;
    return { locationsActivePage, locationsPageSize, locationsTotalPages };
})(RegisterForm)

export default connect(
    null,
    mapDispatchToProps
)(RegisterForm);