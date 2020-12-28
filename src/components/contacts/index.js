import React from "react";
import {Form, Button, Table, Message} from "semantic-ui-react";
import { Field } from "redux-form";
import { errorRenderer } from "../errors";
import DeleteConfirmationModal from "../modals/DeleteConfirmationModal";
import {MOVE_TO_CONTACTS_PAGE} from "../../actions/types";
import TablePagination from "../tables/TablePagination";
import AddRemoveButtons from "../tables/AddRemoveButtons";
import {renderHeaderCheckBox, renderRowCheckBox} from "../MassChangeControls";
import {renderHidden, renderInput} from "../Input";
import {calculatePageRowIndexes} from "../tables/PageRangeCalculator";
import {closeDeleteModal, openDeleteModal} from "../../actions";

const roleOptions = [
    { key: 'ow', value: 'ow', text: 'Owner' },
    { key: 'tc', value: 'tc', text: 'Technician' },
    { key: 'sc', value: 'sc', text: 'Secretary' }
];

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

const ContactRows = ({fields, dispatch, page, pageSize}) => {
    const {firstIndex, lastIndex} = calculatePageRowIndexes(fields, page, pageSize);

    return fields
        .map(contact => contact)
        .slice(firstIndex, lastIndex)
        .map((contact, index) => {
            return(
                <Table.Row key={index}>
                    <Table.Cell collapsing textAlign='center'>
                        <Field
                            key={`${contact}.id`}
                            name={`${contact}.id`}
                            component={renderHidden}
                        />
                        <Field
                            key={`${contact}.selected`}
                            component={renderRowCheckBox}
                            name={`${contact}.selected`}
                        />
                    </Table.Cell>
                    <Table.Cell>
                        <Field
                            key={`${contact}.firstName`}
                            name={`${contact}.firstName`}
                            component={renderInput}
                            placeholder={`Enter the contact's first name...`}
                            required={true}
                        />
                    </Table.Cell>
                    <Table.Cell>
                        <Field
                            key={`${contact}.lastName`}
                            name={`${contact}.lastName`}
                            placeholder={`Enter the contact's last name...`}
                            component={renderInput}
                            required={true}
                        />
                    </Table.Cell>
                    <Table.Cell>
                        <Field
                            key={`${contact}.role`}
                            name={`${contact}.role`}
                            component={renderRoles}
                            required={true}
                            options={roleOptions}
                            placeholder='Select a role...'
                        />
                    </Table.Cell>
                    <Table.Cell>
                        <Field
                            key={`${contact}.email`}
                            name={`${contact}.email`}
                            component={renderInput}
                            placeholder='johndoe@someco.com'
                        />
                    </Table.Cell>
                    <Table.Cell>
                        <Field
                            key={`${contact}.mobile`}
                            name={`${contact}.mobile`}
                            component={renderInput}
                            placeholder='+123 4 123 4567-8911'
                        />
                    </Table.Cell>
                    <Table.Cell>
                        <Field
                            key={`${contact}.phone`}
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
                                    dispatch(openDeleteModal(firstIndex + index));
                                } } >
                        </Button>
                    </Table.Cell>
                </Table.Row>);}
    );
}


export const contactsTab = ({ fields, dispatchers }) => {
    const props = dispatchers.props;

    const messageFields = [
        { field: 'firstName', noValue: '(no First Name)'},
        { field: 'lastName', noValue: '(no Last Name)'}
    ]

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
                    entityName='contacts'
                    action={openDeleteModal()}
                    addButtonIcon='add'
                    deleteButtonIcon='delete'
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
                action={openDeleteModal()}
                addButtonIcon='add'
                deleteButtonIcon='delete'
            />
            <DeleteConfirmationModal
                dispatcher={props}
                entityName='contacts'
                messageFields={messageFields}
                action={closeDeleteModal()}
            />
            <Table sortable celled striped>
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
                        <Table.HeaderCell
                            content='First Name'
                        />
                        <Table.HeaderCell content='Last Name' />
                        <Table.HeaderCell content='Role' />
                        <Table.HeaderCell content='eMail' />
                        <Table.HeaderCell content='Mobile' />
                        <Table.HeaderCell content='Phone' />
                        <Table.HeaderCell />
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <ContactRows fields={fields} dispatch={props.dispatch} page={props.contactsActivePage} pageSize={props.contactsPageSize} totalPages={props.contactsTotalPages}/>
                </Table.Body>
            </Table>
            <TablePagination dispatch={props.dispatch} entity={props.contacts} pageSize={props.contactsPageSize} event={MOVE_TO_CONTACTS_PAGE}/>
        </div>
    );
};