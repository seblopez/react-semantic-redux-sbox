export const required = value => {
    console.log('Required validation ', value);
    return value ? undefined : 'Value is required';
}

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

    if(!formValues.specialties || !formValues.specialties.length) {
        errors.specialties = 'You must enter at least a Specialty';
    }

    if(formValues && formValues.contacts) {

        const contactArrayErrors = [];

        formValues.contacts.forEach((contact, index) => {
            if(!contact.firstName) {
                contactArrayErrors[index] = {...contactArrayErrors[index], firstName: 'You must enter a first name'};
            }
            if(!contact.lastName) {
                contactArrayErrors[index] = {...contactArrayErrors[index], lastName: 'You must enter a last name'};
            }
            if(!contact.role) {
                contactArrayErrors[index] = {...contactArrayErrors[index], role: 'You must enter a role'};
            }

            if(contact.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
                console.log('email validation ', !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email));
                contactArrayErrors[index] = {...contactArrayErrors[index], email: 'Invalid email address'};
            }
        });

        if(contactArrayErrors.length) {
            errors.contacts = contactArrayErrors;
        }
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