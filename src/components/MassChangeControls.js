import {Form} from "semantic-ui-react";
import {errorRenderer} from "./errors";
import React from "react";

export const renderHeaderCheckBox = ({input, fields, dispatcher}) => {
    return(
        <Form.Checkbox
            onChange={(e, {checked}) => {
                input.onChange(checked);
                fields.map(field => dispatcher.updateCheckBoxes(dispatcher.form,`${field}.selected`, checked));
            }}
        />
    )
}

export const renderRowCheckBox = ({input, meta, required}) => {
    return(
        <Form.Checkbox
            checked={!!input.value}
            onChange={(e, { checked }) => input.onChange(checked)}
            error={errorRenderer(meta, required)}
        />
    )
}