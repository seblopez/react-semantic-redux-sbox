export const contactTransformer = contacts => {
    if(!contacts) {
        return null;
    }
    return contacts.map(contact => {
        return {
            id: contact.id,
            firstName: contact.firstName,
            lastName: contact.lastName,
            role: contact.role,
            email: contact.email,
            mobile: contact.mobile,
            phone: contact.phone
        }
    });
}

export const locationTransformer = locations => {
    if (!locations) {
        return null;
    }
    return locations.map(location => {
        return {
            id: location.id,
            name: location.name,
            address: location.address,
            zip: location.zip,
            city: location.city,
            state: location.state,
            country: location.country
        }
    });
}

export const vendorTransformer = vendor => {
    return {
        id: vendor.id,
        name: vendor.name,
        specialties: vendor.specialties,
        contacts: contactTransformer(vendor.contacts),
        locations: locationTransformer(vendor.locations)
    }
}
