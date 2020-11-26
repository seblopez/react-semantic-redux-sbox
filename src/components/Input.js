import {Form} from "semantic-ui-react";
import {errorRenderer} from "./errors";
import React from "react";

export const renderInput = ({input, name, key, meta, placeholder, required}) => {
    return(
        <Form.Input
            key={key}
            name={name}
            placeholder={placeholder}
            required={required}
            value={input.value}
            onChange={(e, {value}) => input.onChange(value)}
            error={errorRenderer(meta, required)}
        />);
}
