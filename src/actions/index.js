import {OPEN_MODAL, CLOSE_MODAL, MOVE_TO_CONTACTS_PAGE} from "./types";

export const openModal = () => {
    return {
        type: OPEN_MODAL
    }
}

export const closeModal = () => {
    return {
        type: CLOSE_MODAL
    }
}

export const moveToContactsPage = () => {
    return {
        type: MOVE_TO_CONTACTS_PAGE
    };
}