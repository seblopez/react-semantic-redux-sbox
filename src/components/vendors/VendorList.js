import React, {Component} from "react";
import {Button, Container, Input, Grid, Header, List, Divider, Message} from "semantic-ui-react";
import {specialtyOptions} from "../../data";
import TablePagination from "../tables/TablePagination";
import {MOVE_TO_VENDORS_PAGE} from "../../actions/types";
import {calculatePageRowIndexes} from "../tables/PageRangeCalculator";
import {connect} from "react-redux";
import {closeDeleteModal, fetchVendors, openDeleteModal} from "../../actions";
import DeleteConfirmationModal from "../modals/DeleteConfirmationModal";

const Specialties = ({vendor}) => {
    const [id, specialties] = JSON.parse(JSON.stringify([vendor.id, vendor.specialties]));
    return(
        <List>
            {specialties.map(specialty =>
                    <List.Item key={`${id}-${specialty}`}>
                        <List.Icon name='check' color='green'/>
                        <List.Content content={specialtyOptions.find(s => s.key === specialty).text}/>
                    </List.Item>
                )}
        </List>
    );
}

const Contact = ({contact}) => {
    if(!contact.email) return <List.Content content={`${contact.firstName} ${contact.lastName}`} />;
    return(
        <List.Content content={<a href={`mailto:${contact.email}`}>{`${contact.firstName} ${contact.lastName}`}</a>} />
    );
}

const Contacts = ({vendor}) => {
    const [id, contacts] = JSON.parse(JSON.stringify([vendor.id, vendor.contacts]));

    return(
        <List>
            {contacts.map(contact =>
                <List.Item key={`${id}-${contact.id}`} >
                    <Contact contact={contact}/>
                </List.Item>
            )}
        </List>
    );

}

const VendorSearchBar = () => {
    return(
        <Grid.Row columns={4} key='searchBar'>
            <Grid.Column width={5}>
                <Input
                    fluid
                    icon='search'
                    placeholder='Search a vendor name...'
                    key='vendorSearch' />
            </Grid.Column>
            <Grid.Column width={5}>
                <Input fluid
                       icon='search'
                       placeholder='Search a specialty...'
                       key='specialtySearch' />
            </Grid.Column>
            <Grid.Column width={5}>
                <Input fluid
                       icon='search'
                       placeholder='Search a contact...'
                       key='contactSearch' />
            </Grid.Column>
            <Grid.Column width={1}/>
        </Grid.Row>
    );
}

const renderHidden = ({id, name}) => <input type='hidden' id={id} value={name} />;

const VendorContainer = ({page, pageSize, dispatch, initialValues}) => {
    if(!initialValues) return(
        <Grid>
            <Grid.Row>
                <Message info>
                    <Message.Content>
                        <Message.Header content="Add your first vendor!" />
                        You currently don't have any vendors created, go ahead and add some!
                    </Message.Content>
                </Message>
            </Grid.Row>
        </Grid>
    );

    return(
        <Grid>
            <VendorSearchBar />
            <VendorGrid
                page={page}
                pageSize={pageSize}
                initialValues={initialValues}
                dispatch={dispatch}
            />
        </Grid>
    );
}

const VendorGrid = ({page, pageSize, dispatch, initialValues}) => {
    const {firstIndex, lastIndex} = calculatePageRowIndexes(initialValues, page, pageSize);

    return(
        initialValues
            .slice(firstIndex, lastIndex)
            .map((vendor, index) =>
                <Grid.Row columns={4} key={index}>
                    <Grid.Column verticalAlign='top' width={5}>
                        {renderHidden(vendor)}
                        <a href={`/vendor/edit/${vendor.id}`}>{vendor.name}</a>
                    </Grid.Column>
                    <Grid.Column verticalAlign='top' width={5}>
                        <Specialties vendor={vendor}/>
                    </Grid.Column>
                    <Grid.Column verticalAlign='top' width={5}>
                        <Contacts vendor={vendor}/>
                    </Grid.Column>
                    <Grid.Column textAlign='center' verticalAlign='middle' width={1}>
                        <Button icon='delete'
                                negative
                                circular
                                name='delete'
                                onClick={e => {
                                    e.preventDefault();
                                    dispatch(openDeleteModal(firstIndex + index));
                                } }
                        />
                    </Grid.Column>
                </Grid.Row>
            )
    );
}

class VendorList extends Component {
    componentDidMount() {
        fetchVendors();
    }


    render() {
        const messageFields = [
            { field: 'name', noValue: '(no vendor name)'}
        ]

        return(
            <Container>
                <DeleteConfirmationModal
                    dispatcher={this.props}
                    entityName='vendors'
                    messageFields={messageFields}
                    modalAction={closeDeleteModal()}
                />
                <Header content='Vendors' />
                <Divider />
                <Grid container divided='vertically'>
                    <VendorContainer
                        page={this.props.vendorListActivePage}
                        pageSize={this.props.vendorListPageSize}
                        initialValues={this.props.vendors}
                        dispatch={this.props.dispatch}
                    />
                </Grid>
                <TablePagination
                    dispatch={this.props.dispatch}
                    entity={this.props.vendors}
                    pageSize={this.props.vendorListPageSize}
                    event={MOVE_TO_VENDORS_PAGE}
                />
                <Divider />
                <Grid>
                    <Grid.Column>
                        <Button
                            as='a'
                            primary
                            href='/vendor/new'
                            content="Create a new Vendor"
                        />
                    </Grid.Column>
                </Grid>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    const vendorListActivePage = state.vendorListPagination.vendorListActivePage;
    const vendorListTotalPages = state.vendorListPagination.vendorListTotalPages;
    const vendorListPageSize = state.vendorListPagination.vendorListPageSize;
    const vendors = state.vendors.payload;
    return { vendorListActivePage, vendorListTotalPages, vendorListPageSize, vendors };
};

const mapDispatchToProps = dispatch => {
    return { fetchVendors: dispatch(fetchVendors()), dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps)(VendorList);