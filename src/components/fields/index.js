import React from "react";
import {Form, Button, Table, Grid, Message, Icon} from "semantic-ui-react";
import { Field } from "redux-form";
import { errorRenderer } from "../errors";
import {required} from "../../validations";

const roleOptions = [
    { key: 'ow', value: 'ow', text: 'Owner' },
    { key: 'tc', value: 'tc', text: 'Technician' },
    { key: 'sc', value: 'sc', text: 'Secretary' }
];

const renderHeaderCheckBox = ({input, fields, dispatcher}) => {
    return(
        <Form.Checkbox
            onChange={(e, {checked}) => {
                input.onChange(checked);
                fields.map(field => dispatcher.updateCheckBoxes(dispatcher.form,`${field}.selected`, checked));
            }}
        />
    )
}

const renderRowCheckBox = ({input, meta, required}) => {
    return(
        <Form.Checkbox
            checked={!!input.value}
            onChange={(e, { checked }) => input.onChange(checked)}
            error={errorRenderer(meta, required)}
        />
    )

}

const renderRoles = ({input, name, key, meta, placeholder, required, options}) => {
    return(
        <Form.Dropdown
            key={key}
            name={name}
            placeholder={placeholder}
            search
            selection
            fluid
            options={options}
            value={input.value}
            required={required}
            onChange={(e, {value}) => input.onChange(value)}
            error={errorRenderer(meta, required)}
        />
    )
};

const renderInput = ({input, name, key, meta, placeholder, required}) => {
    return(
        <Form.Input
            key={key}
            name={name}
            placeholder={placeholder}
            required={required}
            value={input.value}
            onChange={(e, {value}) => input.onChange(value)}
            error={errorRenderer(meta, required)}
        />);
}

const AddRemoveButtons = ({dispatcher}) => {
    const addRows = e => {
        e.preventDefault();
        dispatcher.pushArray(dispatcher.form, 'contacts', '');
    };

    const removeSelectedRows = e => {
        e.preventDefault();
        dispatcher.updateContacts(dispatcher.form, 'contacts', dispatcher.contacts.filter(row => !row.selected))
    };

    if(!dispatcher.contacts || !dispatcher.contacts.length) {
        return (
            <Grid>
                <Grid.Column>
                    <Button content='Add'
                            icon='add user'
                            primary
                            labelPosition='left'
                            onClick={addRows}
                    />
                </Grid.Column>
            </Grid>
        );
    }

    return(
        <Grid>
            <Grid.Column>
                <Button content='Add'
                        icon='add user'
                        primary
                        labelPosition='left'
                        onClick={addRows}
                />
                <Button content='Remove'
                        icon='delete user'
                        negative
                        labelPosition='left'
                        onClick={removeSelectedRows}
                />
            </Grid.Column>
        </Grid>
    );
}

const BottomAddRemoveButtons = ({dispatcher}) => {
    if(dispatcher.props.contacts && dispatcher.props.contacts.length > 5) {
        return <AddRemoveButtons dispatcher={dispatcher.props}/>
    } else {
        return null;
    }
}

export const contacts = ({ fields, dispatchers }) => {
    const props = dispatchers.props;

    if(!fields.length) {
        return(
            <div>
                <Message info>
                    <Message.Content>
                        <Message.Header>
                            Add your first contact to this vendor!
                        </Message.Header>
                        You currently don't have any contacts created, go ahead and add some!
                    </Message.Content>
                </Message>
                <AddRemoveButtons dispatcher={props}/>
            </div>

        );
    }

    return (
        <div>
            <AddRemoveButtons dispatcher={props}/>
            <Table compact padded collapsing celled selectable stackable striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell collapsing textAlign='center'>
                            <Field
                                name='rowSelector'
                                component={renderHeaderCheckBox}
                                fields={fields}
                                dispatcher={props}
                            />
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            First Name
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            Last Name
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            Role
                        </Table.HeaderCell>
                        <Table.HeaderCell />
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {fields.map((contact, index) => {
                        return(
                            <Table.Row key={index}>
                                <Table.Cell collapsing textAlign='center'>
                                    <Field
                                        key={`${contact}.selected`}
                                        component={renderRowCheckBox}
                                        name={`${contact}.selected`}
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                    <Field
                                        key={`firstName${index}`}
                                        name={`${contact}.firstName`}
                                        component={renderInput}
                                        placeholder={`Enter the contact's first name...`}
                                        required={true}
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                    <Field
                                        key={`lastName${index}`}
                                        name={`${contact}.lastName`}
                                        placeholder={`Enter the contact's last name...`}
                                        component={renderInput}
                                        required={true}
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                    <Field
                                        key={`role${index}`}
                                        name={`${contact}.role`}
                                        component={renderRoles}
                                        required={true}
                                        options={roleOptions}
                                        placeholder='Select a role...'
                                    />
                                </Table.Cell>
                                <Table.Cell collapsing textAlign='center'>
                                    <Button icon='delete'
                                            negative
                                            circular
                                            size='mini'
                                            name='delete'
                                            onClick={() => fields.remove(index)} >
                                    </Button>
                                </Table.Cell>
                            </Table.Row>);}
                    )}
                </Table.Body>
            </Table>
            <BottomAddRemoveButtons dispatcher={dispatchers}/>
        </div>
    );
};