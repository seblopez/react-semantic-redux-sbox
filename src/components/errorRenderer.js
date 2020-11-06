import React from "react";

const errorRenderer = ({error, touched}, required) => {
    console.log('Errors? ', error);
    console.log('Touched? ', touched);
    if(touched && error && required) {
        return(
            <div className="label ui up pointing red basic label">
                {error}
            </div>
        );
    }
}

export default errorRenderer;