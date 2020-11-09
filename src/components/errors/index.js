import React from "react";

export const errorRenderer = ({error, touched}, required) => {
    if(touched && error && required) {
        return(
            { content: error }
        );
    }
}

export const rowErrorRenderer = (meta, required, index) => {
    console.log('Required ', required);
    if(meta.touched && required && meta.error) {
        return(
            { content: meta.error }
        );
    }
}