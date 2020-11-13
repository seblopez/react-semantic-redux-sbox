export const errorRenderer = ({error, touched}, required) => {
    if(touched && error && required) {
        return(
            { content: error }
        );
    }
}