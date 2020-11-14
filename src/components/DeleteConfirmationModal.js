import React from "react";
import {Button, Modal, Header, List, Icon} from "semantic-ui-react";
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
            const firstName = contact.firstName ? `${contact.firstName}` : '(no First Name)';
            const lastName = contact.lastName ? `${contact.lastName}` : '(no Last Name)';
            const contactName =`${firstName} ${lastName} as contact?`;
            return(`Are you sure you want to delete ${contactName}`);
        } else {
            const contacts = this.props.dispatcher.contacts
            return(
                <List>
                    <List.Header content='Are you sure you want to delete these contacts?' />
                    {contacts
                        .filter(contact => contact.selected)
                        .map((selectedContact, index) => {
                            const firstName = selectedContact.firstName ? `${selectedContact.firstName}` : '(no First Name)';
                            const lastName = selectedContact.lastName ? `${selectedContact.lastName}` : '(no Last Name)';
                            return(
                                <List.Item key={`tbr${index}`}>
                                    <List.Icon name='delete' color='red' />
                                    <List.Content>{`${firstName} ${lastName}`}</List.Content>
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
                open={this.props.modal.open}
                dimmer={this.props.modal.dimmer}
                onClose={() => this.props.dispatcher.dispatch({ type: 'CLOSE_MODAL' })}
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
        modal: state.modal
    }
}

export default connect(mapStateToProps)(DeleteConfirmationModal);