export const required = value =>
    value ? undefined : 'Value is required';

export const minLength = value =>
    value.length < 4
        ? 'Value must be at least 4 characters'
        : undefined;

export const maxLength = value =>
    value.length > 10 ? 'Value is too long' : undefined;

export const validate = formValues => {
    const errors = {};

    if(!formValues.name) {
        errors.name = 'You must enter a name for the Vendor';
    }

    if(formValues.specialties && formValues.specialties.length === 0) {
        errors.specialties = 'You must enter at least a Specialty';
    }

    return errors;
}

export const asyncValidate = values => {
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    return sleep(1000).then(() => {
        if (['kent', 'andy', 'john', 'joel'].includes(values.username)) {
            return Promise.reject({
                username: 'Username already taken'
            });
        }
    });
};