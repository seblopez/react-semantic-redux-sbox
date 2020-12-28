import React, {Component} from "react";
import {Button, Container, Input, Grid, Header, List, Divider} from "semantic-ui-react";
import {vendorList, specialtyOptions} from "../../data";
import TablePagination from "../tables/TablePagination";
import {MOVE_TO_VENDORS_PAGE} from "../../actions/types";
import {calculatePageRowIndexes} from "../tables/PageRangeCalculator";
import {connect} from "react-redux";

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


const Vendors = ({page, pageSize}) => {
    const {firstIndex, lastIndex} = calculatePageRowIndexes(vendorList, page, pageSize);

    return(
        vendorList
            .slice(firstIndex, lastIndex)
            .map(vendor =>
                <Grid.Row columns={4} key={vendor.id}>
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
                            name='delete'/>
                    </Grid.Column>
                </Grid.Row>
            )
    );
}

class VendorList extends Component {
    render() {
        return(
            <Container>
                <Header content='Vendors' />
                <Divider />
                <Grid
                    container
                    divided='vertically'
                >
                    <VendorSearchBar />
                    <Vendors
                        page={this.props.vendorListActivePage}
                        pageSize={this.props.vendorListPageSize}
                    />
                </Grid>
                <TablePagination
                    dispatch={this.props.dispatch}
                    entity={vendorList}
                    pageSize={this.props.vendorListPageSize}
                    event={MOVE_TO_VENDORS_PAGE}
                />
                <Button
                    as='a'
                    primary
                    href='/vendor/new'
                >
                    Create a new Vendor
                </Button>
            </Container>
        );
    }
}

VendorList = connect(state => {
    const vendorListActivePage = state.vendorListPagination.vendorListActivePage;
    const vendorListTotalPages = state.vendorListPagination.vendorListTotalPages;
    const vendorListPageSize = state.vendorListPagination.vendorListPageSize;
    return { vendorListActivePage, vendorListTotalPages, vendorListPageSize };
})(VendorList)

export default VendorList;