import {Form} from "semantic-ui-react";
import {errorRenderer} from "./errors";
import React from "react";

export const renderInput = ({input, name, label, key, meta, placeholder, required}) => {
    return(
        <Form.Input
            key={key}
            name={name}
            placeholder={placeholder}
            label={label}
            required={required}
            value={input.value}
            onChange={(e, {value}) => input.onChange(value)}
            error={errorRenderer(meta, required)}
        />);
}

export const renderHidden = ({name, input}) => {
    return(
        <input type='hidden' id={name} value={input.value} />
    );
}
