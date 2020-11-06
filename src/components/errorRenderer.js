import React from "react";

const errorRenderer = ({error, touched}, required) => {
    console.log('Errors? ', error);
    console.log('Touched? ', touched);
    if(error && required) {
        return(
            { content: error }
        );
    }
}

export default errorRenderer;