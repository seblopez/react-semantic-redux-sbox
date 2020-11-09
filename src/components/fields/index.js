import React from "react";
import {Form, Button, Table, Grid} from "semantic-ui-react";
import { Field } from "redux-form";
import {errorRenderer, rowErrorRenderer} from "../errors";

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

const renderRowCheckBox = ({input}) => {
    return(
        <Form.Checkbox
            checked={!!input.value}
            onChange={(e, { checked }) => input.onChange(checked)}
        />
    )

}

const renderRoles = ({input}) => {
    return(
        <Form.Dropdown
            placeholder='Select a Role...'
            search
            selection
            options={roleOptions}
            value={input.value}
            onChange={(e, {value}) => {
                input.onChange(value)}}
        />
    )
};

const renderInput = ({input, name, key, meta, required}) => {
    return(
        <Form.Input
            {...input}
            key={key}
            name={name}
            required={required}
            error={errorRenderer(meta, required)}
        />);
}

export const contacts = ({ fields, dispatchers }) => {
    const props = dispatchers.props;

    const addRows = () => {
        props.pushArray(props.form, 'contacts', '');
    };

    const removeSelectedRows = () => {
        props.updateContacts(props.form, 'contacts', props.contacts.filter(row => !row.selected))
    };

    return (
        <div>
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
            <Table compact padded collapsing celled selectable unstackable striped>
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
                                        required={true}
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                    <Field
                                        key={`lastName${index}`}
                                        name={`${contact}.lastName`}
                                        component={renderInput}
                                        required={true}
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                    <Field
                                        key={`role${index}`}
                                        name={`${contact}.role`}
                                        component={renderRoles}
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
        </div>
    );
};