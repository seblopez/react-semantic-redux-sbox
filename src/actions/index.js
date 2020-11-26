import {
    MOVE_TO_CONTACTS_PAGE,
    MOVE_TO_LOCATIONS_PAGE,
    OPEN_DELETE_MODAL,
    CLOSE_DELETE_MODAL
} from "./types";

export const openDeleteModal = () => {
    return {
        type: OPEN_DELETE_MODAL
    };
}

export const closeDeleteModal = () => {
    return {
        type: CLOSE_DELETE_MODAL
    };
}

export const moveToContactsPage = () => {
    return {
        type: MOVE_TO_CONTACTS_PAGE
    };
}

export const moveToLocationsPage = () => {
    return {
        type: MOVE_TO_LOCATIONS_PAGE
    };
}