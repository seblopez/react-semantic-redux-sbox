import React from "react";
import cx from "classnames";
import { connect } from 'react-redux';
import { Field, formValueSelector} from "redux-form";
import {Form, Button, Table, Grid} from "semantic-ui-react";
import RegisterForm from "../RegisterForm";

const getValidityClassName = meta => {
    if (meta.asyncValidating) {
        return "async-validating";
    }
    if (meta.active) {
        return;
    }
    if (meta.touched && meta.invalid) {
        return "invalid";
    }
    if (meta.touched && meta.valid) {
        return "valid";
    }
};

export const customInput = props => {
    const { label, input, type, meta } = props;
    return (
        <div
            className={cx(
                "custom-input-container",
                { "flex-row-reverse": type === "checkbox" },
                { dirty: meta.dirty || meta.initial },
                getValidityClassName(meta)
            )}
        >
            <input {...input} type={type} autoFocus={props.autoFocus} />
            <label>{label}</label>
            {meta.error &&
            meta.touched &&
            !meta.active && (
                <div className="feedback-text error-text">{meta.error}</div>
            )}
        </div>
    );
};

export const customSelect = props => {
    return (
        <div className="custom-select-container">
            <label>{props.label}</label>
            <select {...props.input}>
                <option value="tabs">Tabs</option>
                <option value="spaces">Spaces</option>
            </select>
        </div>
    );
};

const renderHeaderCheckBox = ({input, fields, dispatcher}) => {
    return(
        <Form.Checkbox
            onChange={(e, {checked}) => {
                input.onChange(checked);
                fields.map(field => dispatcher.updateCheckBoxes('register',`${field}.selected`, checked));
            }}
        />
    )
}

const renderRowCheckBox = ({input}) => {
    return(
        <Form.Checkbox
            checked={input.value ? true : false}
            onChange={(e, { checked }) => input.onChange(checked)}
        />
    )

}

export const contacts = ({ fields, dispatchers }) => {
    const addRows = () => {
        dispatchers.pushArray("register", "contacts", "");
    };

    const removeSelectedRows = () => {
        fields.map((field, index) => {
            const selector = formValueSelector('register');
            console.log('Field ', field);
            console.log('Selector ', selector);
        });
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
                                dispatcher={dispatchers}
                            />
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            First Name
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            Last Name
                        </Table.HeaderCell>
                        <Table.HeaderCell />
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {fields.map((contact, index) => {
                        return(
                            <Table.Row key={index} >
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
                                        component={Form.Input}
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                    <Field
                                        key={`lastName${index}`}
                                        name={`${contact}.lastName`}
                                        component={Form.Input}
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