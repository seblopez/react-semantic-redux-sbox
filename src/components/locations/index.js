import React from "react";
import {Button, Form, Message, Table} from "semantic-ui-react";
import {Field} from "redux-form";

import AddRemoveButtons from "../tables/AddRemoveButtons";
import {MOVE_TO_LOCATIONS_PAGE} from "../../actions/types";
import TablePagination from "../tables/TablePagination";
import {renderHeaderCheckBox, renderRowCheckBox} from "../MassChangeControls";
import {errorRenderer} from "../errors";
import DeleteConfirmationModal from "../modals/DeleteConfirmationModal";
import {renderHidden, renderInput} from "../Input";
import {calculatePageRowIndexes} from "../tables/PageRangeCalculator";
import {cityChanged, closeDeleteModal, openDeleteModal} from "../../actions";
import {cities, countries, states} from "../../data";

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
                dispatcher(cityChanged({cityState: option.state, cityIndex: index, cityCountry: option.country }));
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
                                key={`${location}.id`}
                                name={`${location}.id`}
                                component={renderHidden}
                            />
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
                                        dispatch(openDeleteModal(firstIndex + index ));
                                    } } >
                            </Button>
                        </Table.Cell>
                    </Table.Row>);}
            );
}

export const locationsTab = ({fields, dispatchers}) => {
    const props = dispatchers.props;

    const messageFields = [
        { field: 'name', noValue: '(no Denomination)'}
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
                entity={props.locations}
                entityName='locations'
                action={openDeleteModal()}
                addButtonIcon='add'
                deleteButtonIcon='delete'
            />
            <DeleteConfirmationModal
                dispatcher={props}
                entityName='locations'
                messageFields={messageFields}
                modalAction={closeDeleteModal()}/>
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