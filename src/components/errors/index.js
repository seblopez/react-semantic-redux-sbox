export const errorRenderer = ({error, touched}, required) => {
    if(required && touched && error) {
        return(
            { content: error }
        );
    } else if(!required && touched && error) {
        return(
            { content: error }
        );
    }

}

export const errorInvalidDataRenderer = ({error, touched}) => {
    if(touched && error) {
        return (
            {
                content: error
            }
        );
    }
}