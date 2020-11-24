import { MOVE_TO_CONTACTS_PAGE } from "../actions/types";

const INITIAL_STATE = {
    contactsActivePage: 1,
    contactsPageSize: 5,
    contactsTotalPages: 1
}

const contactPaginationReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case MOVE_TO_CONTACTS_PAGE:
            return { ...state, contactsActivePage: action.page, contactsPageSize: action.pageSize, contactsTotalPages: action.totalPages };
        default:
            return state;
    }
}

export default contactPaginationReducer;