import {MOVE_TO_VENDORS_PAGE} from "../actions/types";

const INITIAL_STATE = {
    vendorListActivePage: 1,
    vendorListPageSize: 5,
    vendorListTotalPages: 1
}

const vendorListPaginationReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case MOVE_TO_VENDORS_PAGE:
            return { ...state, vendorListActivePage: action.page, vendorListPageSize: action.pageSize, vendorListTotalPages: action.totalPages };
        default:
            return state;
    }
};

export default vendorListPaginationReducer;