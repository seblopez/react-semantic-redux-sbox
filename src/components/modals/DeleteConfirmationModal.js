import React from "react";
import {Button, Modal, Header, List, Icon} from "semantic-ui-react";
import { connect } from "react-redux";

class DeleteConfirmationModal extends React.Component {

    handleDeleteClick() {
        const {dispatcher, entityName, action, deleteModal} = this.props;

        if(deleteModal.index >= 0) {
            dispatcher.updateRows(dispatcher.form, entityName, dispatcher[entityName].filter((_, i) => i !== this.props.deleteModal.index));
        } else {
            dispatcher.updateRows(dispatcher.form, entityName, dispatcher[entityName].filter(row => !row.selected));
        }
        dispatcher.dispatch(action);
    }

    handleCancelClick() {
        this.props.dispatcher.dispatch(this.props.action);
    }

    renderContent() {
        const {dispatcher, entityName, deleteModal, messageFields} = this.props;
        console.log('Delete modal ', deleteModal);
        const entityIndex = deleteModal.index;

        if(entityIndex >= 0) {
            const entityElement = dispatcher[entityName][entityIndex];
            const itemToRemove = messageFields
                .map(messageField => entityElement[messageField.field] ? `${entityElement[messageField.field]}` : `${messageField.noValue}`).join(' ');

            return(`Are you sure you want to delete ${itemToRemove}?`);
        } else {
            const rows = dispatcher[entityName];
            if(!rows) {
                return(
                    <List>
                        <List.Header content={`No ${entityName} to remove.`} />
                    </List>
                );
            }
            return(
                <List>
                    <List.Header content={`Are you sure you want to delete these ${entityName}?`} />
                    {rows
                        .filter(row => row.selected)
                        .map((selectedRow, index) => {
                            const itemToRemove = this.props.messageFields
                                .map(messageField =>
                                    selectedRow[messageField.field] ? `${selectedRow[messageField.field]}` : `${messageField.noValue}`).join(' ');
                            return(
                                <List.Item key={`tbr${index}`}>
                                    <List.Icon name='delete' color='red' />
                                    <List.Content>{`${itemToRemove}`}</List.Content>
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
                open={this.props.deleteModal.open}
                dimmer={this.props.deleteModal.dimmer}
                onClose={() => this.props.dispatcher.dispatch(this.props.action)}
            >
                <Header>
                    <Icon name='warning' circular color='red' inverted size='small'/>
                    Delete {this.props.entityName}
                </Header>
                <Modal.Content content={this.renderContent()} />
                <Modal.Actions>
                    <Button
                        content='Delete'
                        negative
                        onClick={() => this.handleDeleteClick()}
                    />
                    <Button
                        content='Cancel'
                        onClick={() => this.handleCancelClick()}
                    />
                </Modal.Actions>
            </Modal>

        )
    }
}

const mapStateToProps = state => {
    return {
        deleteModal: state.deleteModal
    }
}

export default connect(mapStateToProps)(DeleteConfirmationModal);