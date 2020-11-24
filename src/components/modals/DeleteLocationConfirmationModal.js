import React from "react";
import {Button, Modal, Header, List, Icon} from "semantic-ui-react";
import { connect } from "react-redux";

import { CLOSE_LOCATION_DELETE_MODAL } from "../../actions/types";

class DeleteLocationConfirmationModal extends React.Component {

    handleDeleteClick() {
        if(this.props.deleteLocationModal.index >= 0) {
            this.props.dispatcher.updateLocations(this.props.dispatcher.form, 'locations', this.props.dispatcher.locations.filter((_, i) => i !== this.props.deleteLocationModal.index));
        } else {
            this.props.dispatcher.updateLocations(this.props.dispatcher.form, 'locations', this.props.dispatcher.locations.filter(row => !row.selected));
        }
        this.props.dispatcher.dispatch({type: CLOSE_LOCATION_DELETE_MODAL});
    }

    handleCancelClick() {
        this.props.dispatcher.dispatch({type: CLOSE_LOCATION_DELETE_MODAL})
    }

    renderContent() {
        const locationIndex = this.props.deleteLocationModal.index;

        if(locationIndex >= 0) {
            const location = this.props.dispatcher.locations[locationIndex];
            const name = location.name ? `${location.name}` : '(no denomination)';
            return(`Are you sure you want to delete ${name}`);
        } else {
            const locations = this.props.dispatcher.locations
            if(!locations) {
                return(
                    <List>
                        <List.Header content='There are no locations to remove.' />
                    </List>

                );
            }
            return(
                <List>
                    <List.Header content='Are you sure you want to delete these locations?' />
                    {locations
                        .filter(location => location.selected)
                        .map((selectedLocation, index) => {
                            const name = selectedLocation.name ? `${selectedLocation.name}` : '(no denomination)';
                            return(
                                <List.Item key={`loctbr${index}`}>
                                    <List.Icon name='delete' color='red' />
                                    <List.Content>{`${selectedLocation}`}</List.Content>
                                </List.Item>
                            );
                        })}
                </List>
            );
        }
    }

    render() {
        return (
            <Modal
                closeIcon
                centered={false}
                closeOnEscape={true}
                closeOnDimmerClick={true}
                open={this.props.deleteLocationModal.open}
                dimmer={this.props.deleteLocationModal.dimmer}
                onClose={() => this.props.dispatcher.dispatch({ type: CLOSE_LOCATION_DELETE_MODAL })}
            >
                <Header>
                    <Icon name='user delete' circular color='red' inverted size='small'/>
                    Delete contact(s)
                </Header>
                <Modal.Content content={this.renderContent()} />
                <Modal.Actions>
                    <Button
                        content='Delete'
                        negative
                        onClick={() => this.handleDeleteClick()}
                    />
                    <Button onClick={() => this.handleCancelClick()}>Cancel</Button>
                </Modal.Actions>
            </Modal>

    )
    }
}

const mapStateToProps = state => {
    return {
        deleteLocationModal: state.deleteLocationModal
    }
}

export default connect(mapStateToProps)(DeleteLocationConfirmationModal);