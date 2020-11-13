import React from "react";
import { Button, Modal } from "semantic-ui-react";
import { CLOSE_MODAL } from "../actions/types";
import { connect } from "react-redux";

class DeleteConfirmationModal extends React.Component {

    handleDeleteClick() {
        this.props.dispatcher.updateContacts(this.props.dispatcher.form, 'contacts', this.props.dispatcher.contacts.filter(row => !row.selected));
        this.props.dispatcher.dispatch({type: CLOSE_MODAL});
    }

    handleCancelClick() {
        this.props.dispatcher.dispatch({type: CLOSE_MODAL})
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
                <Modal.Header>Delete Contact(s)</Modal.Header>
                <Modal.Content>
                    Are you sure you want to delete these contacts?
                </Modal.Content>
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