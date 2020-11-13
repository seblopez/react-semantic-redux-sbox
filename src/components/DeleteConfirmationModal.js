import React from "react";
import {Button, Modal, Header, List} from "semantic-ui-react";
import { CLOSE_MODAL } from "../actions/types";
import { connect } from "react-redux";

class DeleteConfirmationModal extends React.Component {

    handleDeleteClick() {
        if(this.props.modal.index >= 0) {
            this.props.dispatcher.updateContacts(this.props.dispatcher.form, 'contacts', this.props.dispatcher.contacts.filter((_, i) => i !== this.props.modal.index));
        } else {
            this.props.dispatcher.updateContacts(this.props.dispatcher.form, 'contacts', this.props.dispatcher.contacts.filter(row => !row.selected));
        }
        this.props.dispatcher.dispatch({type: CLOSE_MODAL});
    }

    handleCancelClick() {
        this.props.dispatcher.dispatch({type: CLOSE_MODAL})
    }

    renderContent() {
        const contactIndex = this.props.modal.index;

        if(contactIndex >= 0) {
            const contact = this.props.dispatcher.contacts[contactIndex];
            const contactName = contact.firstName || contact.lastName ? `${contact.firstName} ${contact.lastName} as contact?` : 'this row?';
            return(`Are you sure you want to delete ${contactName}`);
        } else {
            const contacts = this.props.dispatcher.contacts
            return(
                <div>
                    Are you sure you want to delete these contacts?
                    <List>
                        {contacts.filter(contact => contact.selected)
                            .map(selectedContact => {
                                return(
                                    <List.Item icon='user delete red' content={`${selectedContact.firstName} ${selectedContact.lastName}`}/>
                                );
                            })}
                    </List>
                </div>
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
                open={this.props.modal.open}
                dimmer={this.props.modal.dimmer}
                onClose={() => this.props.dispatcher.dispatch({ type: 'CLOSE_MODAL' })}
            >
                <Header icon="delete user circular red inverted" content="Delete Contact(s)" />
                <Modal.Content content={this.renderContent()} />
                <Modal.Actions>
                    <Button
                        onClick={() => this.handleDeleteClick()}
                        className="ui button negative">Delete</Button>
                    <Button onClick={() => this.handleCancelClick()}>Cancel</Button>
                </Modal.Actions>
            </Modal>

    )
    }
}

const mapStateToProps = state => {
    return {
        modal: state.modal
    }
}

export default connect(mapStateToProps)(DeleteConfirmationModal);