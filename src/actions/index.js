import {
    OPEN_CONTACT_DELETE_MODAL,
    CLOSE_CONTACT_DELETE_MODAL,
    MOVE_TO_CONTACTS_PAGE,
    OPEN_LOCATION_DELETE_MODAL, CLOSE_LOCATION_DELETE_MODAL, MOVE_TO_LOCATIONS_PAGE
} from "./types";

export const openContactDeleteModal = () => {
    return {
        type: OPEN_CONTACT_DELETE_MODAL
    }
}

export const closeContactDeleteModal = () => {
    return {
        type: CLOSE_CONTACT_DELETE_MODAL
    }
}

export const moveToContactsPage = () => {
    return {
        type: MOVE_TO_CONTACTS_PAGE
    };
}

export const openLocationDeleteModal = () => {
    return {
      type: OPEN_LOCATION_DELETE_MODAL
    };
}

export const closeLocationDeleteModal = () => {
    return {
        type: CLOSE_LOCATION_DELETE_MODAL
    };
}

export const moveToLocationsPage = () => {
    return {
        type: MOVE_TO_LOCATIONS_PAGE
    };
}