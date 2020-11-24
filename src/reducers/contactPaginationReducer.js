import { MOVE_TO_CONTACTS_PAGE } from "../actions/types";

const INITIAL_STATE = {
    page: 1,
    pageSize: 5,
    totalPages: 1
}

const contactPaginationReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case MOVE_TO_CONTACTS_PAGE:
            return { ...state, page: action.page, pageSize: action.pageSize, totalPages: action.totalPages };
        default:
            return state;
    }
}

export default contactPaginationReducer;