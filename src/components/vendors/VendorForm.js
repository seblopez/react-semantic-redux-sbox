import React, {Component} from "react";
import {connect} from "react-redux";
import {arrayPush, change, Field, FieldArray, formValueSelector, reduxForm} from "redux-form";
import {contactsTab} from "../contacts";
import {Button, Divider, Form, Grid, Header, Tab} from "semantic-ui-react";
import {validate} from "../../validations";
import "./VendorForm.css";
import {errorRenderer} from "../errors";
import {locationsTab} from "../locations";
import {renderHidden, renderInput} from "../Input";
import {specialtyOptions} from "../../data";

const panes = props => [
    { menuItem: { key: 'users', icon: 'users', content: 'Contacts' }, render: () => <Tab.Pane content={renderContacts(props)} />},
    { menuItem: { key: 'location', icon: 'location arrow', content: 'Locations' }, render: () => <Tab.Pane content={renderLocations(props)} />}
];

const renderContacts = props => {
    return(
        <Contacts props={props}/>
    );
}

const renderLocations = props => {
    return(
        <Locations props={props} />
    );
}

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
        if(this.props.initialValues) this.props.initialize(this.props.initialValues);
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

    onSubmit = values => this.props.onSubmit(values);

    render() {
        return (
            <Form onSubmit={this.props.handleSubmit(this.onSubmit)} noValidate>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <Header content={this.props.title} />
                            <Divider />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
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
                    </Grid.Row>
                </Grid>
                <Grid>
                    <Grid.Column>
                        {tabs(this.props)}
                    </Grid.Column>
                </Grid>
                <Grid>
                    <Grid.Column verticalAlign={'middle'}>
                        <Button primary>
                            Submit
                        </Button>
                    </Grid.Column>
                    <Grid.Column width={2} verticalAlign={'middle'}>
                        <a href={"/vendor/list"}>Back to Vendor List</a>
                    </Grid.Column>
                </Grid>
            </Form>
        );
    }
}

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

VendorForm = connect(state => {
    const sorting = state.sorting;
    return {sorting};
})(VendorForm);

const mapDispatchToProps = {
    // NOTE: This MUST be aliased or it will not work
    pushArray: arrayPush,
    updateCheckBoxes: change,
    updateContacts: change,
    updateLocations: change,
    updateRows: change
};

export default connect(
    null,
    mapDispatchToProps
)(VendorForm);