import React from "react";
import {Message, Table, Button, Form} from "semantic-ui-react";
import {Field} from "redux-form";

import AddRemoveButtons from "../components/tables/AddRemoveButtons";
import {MOVE_TO_LOCATIONS_PAGE, OPEN_LOCATION_DELETE_MODAL} from "../actions/types";
import TablePagination from "../components/tables/TablePagination";
import {renderHeaderCheckBox, renderRowCheckBox} from "../components/MassChangeControls";
import {errorRenderer} from "../components/errors";
import DeleteLocationConfirmationModal from "../components/modals/DeleteLocationConfirmationModal";

const cities = [
    {
        key: '2324342213as23e',
        text: 'Buenos Aires',
        value: '2324342213as23e',
        state: '343qwd34wsd343'
    },
    {
        key: '2324342213uid3e',
        text: 'Banfield',
        value: '2324342213uid3e',
        state: '343qwd34wsd12w'
    },
    {
        key: '232434221e323e',
        text: 'Quilmes',
        value: '232434221e323e',
        state: '343qwd34wsd12w'
    },
    {
        key: '232434221ss23e',
        text: 'Pleasanton',
        value: '232434221ss23e',
        state: '343qwd34wsd343'
    },
    {
        key: '2324342213ac24e',
        text: 'Berkeley',
        value: '2324342213ac24e',
        state: '343qwd34wsd343'
    }
];

const states = [
    {
        key: '345343243s3dsa',
        text: 'California',
        value: '345343243s3dsa',
        country: '343qwd34wsd343'
    },
    {
        key: '345343243s3d2a',
        text: 'Nebraska',
        value: '345343243s3d2a',
        country: '343qwd34wsd343'
    },
    {
        key: '345343243s3dsd',
        text: 'Washington',
        value: '345343243s3dsd',
        country: '343qwd34wsd343'
    },
    {
        key: '345343243s3dfg',
        text: 'Delaware',
        value: '345343243s3dfg',
        country: '343qwd34wsd343'
    },
    {
        key: '345343243s3d3d',
        text: 'Buenos Aires',
        value: '345343243s3d3d',
        country: '343qwd34wsd12w'
    },
    {
        key: '345343243s3dlk',
        text: 'Ciudad Autónoma de Buenos Aires',
        value: '345343243s3dlk',
        country: '343qwd34wsd343'
    },
    {
        key: '345343243s3d90',
        text: 'Santa Fe',
        value: '345343243s3d90',
        country: '343qwd34wsd343'
    }
];

const countries = [
    {
        key: '343qwd34wsd343',
        text: 'Argentina',
        value: '343qwd34wsd343',
        flag: 'ar'
    },
    {
        key: '343qwd34wsd342',
        text: 'USA',
        value: '343qwd34wsd342',
        flag: 'us'
    }

];

const renderCity = ({input, name, key, meta, placeholder, required, options}) => {
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

const renderState = ({input, name, key, meta, placeholder, required, options}) => {
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

const renderCountry = ({input, name, key, meta, placeholder, required, options}) => {
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

const LocationRows = ({fields, dispatch, page, pageSize}) => {
    const lastPageIndex = page * pageSize;
    const firstPageIndex = lastPageIndex - pageSize;
    console.log('Page ', page);
    console.log('Page size ', pageSize);
    return fields
            .map(location => location)
            .slice(firstPageIndex, lastPageIndex)
            .map((location, index) => {
                return(
                    <Table.Row key={index}>
                        <Table.Cell collapsing textAlign='center'>
                            <Field
                                key={`${location}.selected`}
                                component={renderRowCheckBox}
                                name={`${location}.selected`}
                            />
                        </Table.Cell>
                        <Table.Cell>
                            <Field
                                key={`name${index}`}
                                name={`${location}.name`}
                                component={renderInput}
                                placeholder={`Enter the location's name...`}
                                required={true}
                            />
                        </Table.Cell>
                        <Table.Cell>
                            <Field
                                key={`address${index}`}
                                name={`${location}.address`}
                                placeholder={`Enter the location's address...`}
                                component={renderInput}
                                required={true}
                            />
                        </Table.Cell>
                        <Table.Cell>
                            <Field
                                key={`city${index}`}
                                name={`${location}.role`}
                                component={renderCity}
                                required={true}
                                options={cities}
                                placeholder='Select a city...'
                            />
                        </Table.Cell>
                        <Table.Cell>
                            <Field
                                key={`zip${index}`}
                                name={`${location}.zip`}
                                component={renderInput}
                                placeholder='Enter a zip/postal code...'
                            />
                        </Table.Cell>
                        <Table.Cell>
                            <Field
                                key={`state${index}`}
                                name={`${location}.state`}
                                component={renderState}
                                options={states}
                                placeholder='Select a state/province...'
                            />
                        </Table.Cell>
                        <Table.Cell>
                            <Field
                                key={`country${index}`}
                                name={`${location}.country`}
                                component={renderCountry}
                                options={countries}
                                placeholder='Select a country...'
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
                                        dispatch({type: OPEN_LOCATION_DELETE_MODAL, dimmer: 'blurring', index: index });
                                    } } >
                            </Button>
                        </Table.Cell>
                    </Table.Row>);}
            );
}

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

export const locationsTab = ({fields, dispatchers}) => {
    const props = dispatchers.props;

    console.log('Location Props ', props);

    if(!fields.length) {
        return(
            <div>
                <Message info>
                    <Message.Content>
                        <Message.Header>
                            Add your first location to this vendor!
                        </Message.Header>
                        You currently don't have any locations created, go ahead and add some!
                    </Message.Content>
                </Message>
                <AddRemoveButtons
                    dispatcher={props}
                    entity={props.locations}
                    entityName='locations'
                    action={{type: OPEN_LOCATION_DELETE_MODAL, dimmer:'blurring'}}
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
                entity={props.locations}
                entityName='locations'
                action={{type: OPEN_LOCATION_DELETE_MODAL, dimmer:'blurring'}}
                addButtonIcon='add'
                deleteButtonIcon='delete'
            />
            <DeleteLocationConfirmationModal dispatcher={props} />
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
                        <Table.HeaderCell content='Denomination' />
                        <Table.HeaderCell content='Address' />
                        <Table.HeaderCell content='City' />
                        <Table.HeaderCell content='Zip/Postal Code' />
                        <Table.HeaderCell content='Province/State' />
                        <Table.HeaderCell content='Country' />
                        <Table.HeaderCell />
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <LocationRows fields={fields} dispatch={props.dispatch} page={props.locationsActivePage} pageSize={props.locationsPageSize}/>
                </Table.Body>
            </Table>
            <TablePagination dispatch={props.dispatch} entity={props.locations} pageSize={props.locationsPageSize} event={MOVE_TO_LOCATIONS_PAGE}/>
        </div>
    );
}