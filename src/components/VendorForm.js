import React, { Component } from "react";
import { connect } from "react-redux";
import {Field, FieldArray, reduxForm, arrayPush, change, formValueSelector} from "redux-form";
import { contactsTab } from "./contacts";
import { Form, Grid, Button, Tab } from "semantic-ui-react";
import {
    validate
} from "../validations";
import "./VendorForm.css";
import { errorRenderer } from "./errors";
import {locationsTab} from "./locations";
import {renderHidden, renderInput} from "./Input";

const specialtyOptions = [
    { key: '1233d3dde', text: 'Gas', value: '1233d3dde' },
    { key: '1233d3dda', text: 'Electricity', value: '1233d3dda' },
    { key: '1232d3eda', text: 'Plumbing', value: '1232d3eda' },
    { key: '14321e3sd', text: 'Painting', value: '14321e3sd' }
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

class VendorForm extends Component {
    componentDidMount() {
        this.props.initialize({
            id: 'dsdsa2232dasda',
            name: 'Ovelar Hnos.',
            specialties: [ '1233d3dde', '1232d3eda'],
            contacts: [
                { id: '34342dsds34', firstName: 'Jonas', lastName: 'Kahnwald', role: 'ow', email: 'jonas.kahnwald@ovelarhnos.com', mobile: '+54 9 11 4322-3435' },
                { id: '34342dsds35', firstName: 'Martha', lastName: 'Nielsen', role: 'tc', email: 'martha.nielsen@ovelarhnos.com', mobile: '+54 9 11 4322-3432'  }
                ],
            locations: [
                {
                    id: '32323sds34',
                    name: 'Casa Central',
                    address: 'Arenales 3135',
                    zip: '1425',
                    city: '2324342213as23e',
                    state: '345343243s3dlk',
                    country: '343qwd34wsd343'}
            ]
        });
    }

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
                            name="id"
                            component={renderHidden}
                        />
                        <Field
                            name="name"
                            component={renderInput}
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

VendorForm = reduxForm({
    form: "register",
    touchOnChange: true,
    validate
})(VendorForm);

const selector = formValueSelector('register');

VendorForm = connect(state => {
    const contacts = selector(state, 'contacts');
    return { contacts };
})(VendorForm);

VendorForm = connect(state => {
    const locations = selector(state, 'locations');
    return { locations };
})(VendorForm);

VendorForm = connect(state => {
    const cityState = state.cityChanged.cityState;
    const cityIndex = state.cityChanged.cityIndex;
    const cityCountry = state.cityChanged.cityCountry;
    return {cityState, cityIndex, cityCountry};
})(VendorForm);

VendorForm = connect(state => {
    const contactsActivePage = state.contactPagination.contactsActivePage;
    const contactsTotalPages = state.contactPagination.contactsTotalPages;
    const contactsPageSize = state.contactPagination.contactsPageSize;
    return { contactsActivePage, contactsPageSize, contactsTotalPages };
})(VendorForm)

VendorForm = connect(state => {
    const locationsActivePage = state.locationPagination.locationsActivePage;
    const locationsTotalPages = state.locationPagination.locationsTotalPages;
    const locationsPageSize = state.locationPagination.locationsPageSize;
    return { locationsActivePage, locationsPageSize, locationsTotalPages };
})(VendorForm)

export default connect(
    null,
    mapDispatchToProps
)(VendorForm);