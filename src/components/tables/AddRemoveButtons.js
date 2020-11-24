import React from "react";
import {Button, Grid} from "semantic-ui-react";

const AddRemoveButtons = ({dispatcher, action, entity, entityName, addButtonIcon, deleteButtonIcon}) => {
    const addRows = e => {
        e.preventDefault();
        dispatcher.pushArray(dispatcher.form, entityName, '');
    };

    const removeSelectedRows = e => {
        e.preventDefault();
        dispatcher.dispatch(action);
    };

    if(!entity || !entity.length) {
        return (
            <Grid>
                <Grid.Column>
                    <Button content='Add'
                            icon={addButtonIcon}
                            primary
                            labelPosition='left'
                            onClick={addRows}
                    />
                </Grid.Column>
            </Grid>
        );
    }

    return(
        <Grid>
            <Grid.Column>
                <Button content='Add'
                        icon={addButtonIcon}
                        primary
                        labelPosition='left'
                        onClick={addRows}
                />
                <Button content='Remove'
                        icon={deleteButtonIcon}
                        negative
                        labelPosition='left'
                        disabled={!entity || !entity.filter(row => row.selected).length}
                        onClick={removeSelectedRows}
                />
            </Grid.Column>
        </Grid>
    );
}

export default AddRemoveButtons;