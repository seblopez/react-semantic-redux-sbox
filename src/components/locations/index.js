import React from "react";
import {Message, Table, Button, Form} from "semantic-ui-react";
import {Field} from "redux-form";

import AddRemoveButtons from "../tables/AddRemoveButtons";
import {
    CITY_CHANGED,
    CLOSE_DELETE_MODAL,
    MOVE_TO_LOCATIONS_PAGE,
    OPEN_DELETE_MODAL
} from "../../actions/types";
import TablePagination from "../tables/TablePagination";
import {renderHeaderCheckBox, renderRowCheckBox} from "../MassChangeControls";
import {errorRenderer} from "../errors";
import DeleteConfirmationModal from "../modals/DeleteConfirmationModal";
import {renderInput} from "../Input";
import {calculatePageRowIndexes} from "../tables/PageRangeCalculator";

const cities = [
    {
        key: '2324342213as23e',
        text: 'Buenos Aires',
        value: '2324342213as23e',
        state: '345343243s3dlk',
        country: '343qwd34wsd343'
    },
    {
        key: '2324342213uid3e',
        text: 'Banfield',
        value: '2324342213uid3e',
        state: '343qwd34wsd12w',
        country: '343qwd34wsd343'
    },
    {
        key: '232434221e323e',
        text: 'Quilmes',
        value: '232434221e323e',
        state: '343qwd34wsd12w',
        country: '343qwd34wsd343'
    },
    {
        key: '232434221ss23e',
        text: 'Pleasanton',
        value: '232434221ss23e',
        state: '343qwd34wsd345',
        country: '343qwd34wsd342'
    },
    {
        key: '2324342213ac24e',
        text: 'Berkeley',
        value: '2324342213ac24e',
        state: '343qwd34wsd345',
        country: '343qwd34wsd342'
    }
];

const states = [
    {
        key: '343qwd34wsd345',
        text: 'California',
        value: '345343243s3dsa',
        country: '343qwd34wsd342'
    },
    {
        key: '345343243s3d2a',
        text: 'Nebraska',
        value: '345343243s3d2a',
        country: '343qwd34wsd342'
    },
    {
        key: '345343243s3dsd',
        text: 'Washington',
        value: '345343243s3dsd',
        country: '343qwd34wsd342'
    },
    {
        key: '345343243s3dfg',
        text: 'Delaware',
        value: '345343243s3dfg',
        country: '343qwd34wsd342'
    },
    {
        key: '343qwd34wsd12w',
        text: 'Buenos Aires',
        value: '343qwd34wsd12w',
        country: '343qwd34wsd343'
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

const renderCity = ({input, name, key, meta, placeholder, required, options, dispatcher, index}) => {
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
            onChange={(e, data) => {
                const option = options.find(option => option.key === data.value);
                dispatcher({type: CITY_CHANGED, cityState: option.state, cityIndex: index, cityCountry: option.country })
                input.onChange(data.value);
            }}
            error={errorRenderer(meta, required)}
        />
    )
};

const renderState = ({input, name, key, meta, placeholder, required, options, index, cityState, cityIndex}) => {
    return(
        <Form.Dropdown
            key={key}
            name={name}
            placeholder={placeholder}
            search
            selection
            options={options.filter(option => index === cityIndex ? option.key === cityState : true)}
            value={input.value}
            required={required}
            onChange={(e, {value}) => input.onChange(value)}
            error={errorRenderer(meta, required)}
        />
    )
};

const renderCountry = ({input, name, key, meta, placeholder, required, options, index, cityIndex, cityCountry}) => {
    return(
        <Form.Dropdown
            key={key}
            name={name}
            placeholder={placeholder}
            search
            selection
            options={options.filter(option => index === cityIndex ? option.key === cityCountry : true )}
            value={input.value}
            required={required}
            onChange={(e, {value}) => input.onChange(value)}
            error={errorRenderer(meta, required)}
        />
    )
};

const LocationRows = ({fields, dispatch, page, pageSize, cityState, cityIndex, cityCountry}) => {
    const {firstIndex, lastIndex} = calculatePageRowIndexes(fields, page, pageSize);
    return fields
            .map(location => location)
            .slice(firstIndex, lastIndex)
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
                                key={`${location}.name`}
                                name={`${location}.name`}
                                component={renderInput}
                                placeholder={`Enter the location's name...`}
                                required={true}
                            />
                        </Table.Cell>
                        <Table.Cell>
                            <Field
                                key={`${location}.address`}
                                name={`${location}.address`}
                                placeholder={`Enter the location's address...`}
                                component={renderInput}
                                required={true}
                            />
                        </Table.Cell>
                        <Table.Cell>
                            <Field
                                key={`${location}.city`}
                                name={`${location}.city`}
                                component={renderCity}
                                required={true}
                                options={cities}
                                placeholder='Select a city...'
                                index={firstIndex + index}
                                dispatcher={dispatch}
                            />
                        </Table.Cell>
                        <Table.Cell>
                            <Field
                                key={`${location}.zip`}
                                name={`${location}.zip`}
                                component={renderInput}
                                placeholder='Enter a zip/postal code...'
                            />
                        </Table.Cell>
                        <Table.Cell>
                            <Field
                                key={`${location}.state`}
                                name={`${location}.state`}
                                component={renderState}
                                options={states}
                                index={firstIndex + index}
                                cityState={cityState}
                                cityIndex={cityIndex}
                                placeholder='Select a state/province...'
                            />
                        </Table.Cell>
                        <Table.Cell>
                            <Field
                                key={`${location}.country`}
                                name={`${location}.country`}
                                component={renderCountry}
                                options={countries}
                                index={firstIndex + index}
                                cityCountry={cityCountry}
                                cityIndex={cityIndex}
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
                                        dispatch({type: OPEN_DELETE_MODAL, dimmer: 'blurring', index: firstIndex + index });
                                    } } >
                            </Button>
                        </Table.Cell>
                    </Table.Row>);}
            );
}

export const locationsTab = ({fields, dispatchers}) => {
    const props = dispatchers.props;

    const messageFields = [
        { field: 'name', noValue: '(no First Name)'}
    ]


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
                    action={{type: OPEN_DELETE_MODAL, dimmer:'blurring'}}
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
                action={{type: OPEN_DELETE_MODAL, dimmer:'blurring'}}
                addButtonIcon='add'
                deleteButtonIcon='delete'
            />
            <DeleteConfirmationModal
                dispatcher={props}
                entityName='locations'
                messageFields={messageFields}
                action={{type: CLOSE_DELETE_MODAL}}/>
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
                    <LocationRows
                        fields={fields}
                        dispatch={props.dispatch}
                        page={props.locationsActivePage}
                        pageSize={props.locationsPageSize}
                        cityState={props.cityState}
                        cityIndex={props.cityIndex}
                        cityCountry={props.cityCountry}
                />
                </Table.Body>
            </Table>
            <TablePagination dispatch={props.dispatch} entity={props.locations} pageSize={props.locationsPageSize} event={MOVE_TO_LOCATIONS_PAGE}/>
        </div>
    );
}