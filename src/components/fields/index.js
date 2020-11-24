import React from "react";
import {Form, Button, Table, Grid, Message, Pagination} from "semantic-ui-react";
import { Field } from "redux-form";
import { errorRenderer } from "../errors";
import DeleteConfirmationModal from "../DeleteConfirmationModal";
import {MOVE_TO_CONTACTS_PAGE, OPEN_MODAL} from "../../actions/types";
import TablePagination from "../tables/TablePagination";
import AddRemoveButtons from "../tables/AddRemoveButtons";

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

const ContactRows = ({fields, dispatch, page, pageSize}) => {
    const lastPageIndex = page * pageSize;
    const firstPageIndex = lastPageIndex - pageSize;
    return fields
        .map(contact => contact)
        .slice(firstPageIndex, lastPageIndex)
        .map((contact, index) => {
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
                    <Table.Cell>
                        <Field
                            key={`email${index}`}
                            name={`${contact}.email`}
                            component={renderInput}
                            placeholder='johndoe@someco.com'
                        />
                    </Table.Cell>
                    <Table.Cell>
                        <Field
                            key={`mobile${index}`}
                            name={`${contact}.mobile`}
                            component={renderInput}
                            placeholder='+123 4 123 4567-8911'
                        />
                    </Table.Cell>
                    <Table.Cell>
                        <Field
                            key={`phone${index}`}
                            name={`${contact}.phone`}
                            component={renderInput}
                            placeholder='+123 123 4567-8911'
                        />
                    </Table.Cell>
                    <Table.Cell collapsing textAlign='center'>
                        <Button icon='delete'
                                negative
                                circular
                                size='mini'
                                name='delete'
                                onClick={e => {
                                    e.preventDefault();
                                    dispatch({type: OPEN_MODAL, dimmer: 'blurring', index: index });
                                } } >
                        </Button>
                    </Table.Cell>
                </Table.Row>);}
    );
}


export const contactsTab = ({ fields, dispatchers }) => {
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
                <AddRemoveButtons
                    dispatcher={props}
                    entity={props.contacts}
                    entityName='contacts'
                    action={{type: OPEN_MODAL, dimmer:'blurring'}}
                    addButtonIcon='add user'
                    deleteButtonIcon='delete user'
                />
            </div>
        );
    }

    return (
        <div>
            <AddRemoveButtons
                dispatcher={props}
                entity={props.contacts}
                entityName='contacts'
                action={{type: OPEN_MODAL, dimmer:'blurring'}}
                addButtonIcon='add user'
                deleteButtonIcon='delete user'
            />
            <DeleteConfirmationModal dispatcher={props} />
            <Table celled stackable striped>
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
                        <Table.HeaderCell content='First Name' />
                        <Table.HeaderCell content='Last Name' />
                        <Table.HeaderCell content='Role' />
                        <Table.HeaderCell content='eMail' />
                        <Table.HeaderCell content='Mobile' />
                        <Table.HeaderCell content='Phone' />
                        <Table.HeaderCell />
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <ContactRows fields={fields} dispatch={props.dispatch} page={props.activePage} pageSize={props.pageSize}/>
                </Table.Body>
            </Table>
            <TablePagination dispatch={props.dispatch} entity={props.contacts} pageSize={props.pageSize} event={MOVE_TO_CONTACTS_PAGE}/>
        </div>
    );
};