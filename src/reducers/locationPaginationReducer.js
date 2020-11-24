import { MOVE_TO_LOCATIONS_PAGE } from "../actions/types";

const INITIAL_STATE = {
    locationsActivePage: 1,
    locationsPageSize: 5,
    locationsTotalPages: 1
}

const locationPaginationReducer = (state = INITIAL_STATE, action) => {
    console.log('Pagination reducer state ', state);
    switch (action.type) {
        case MOVE_TO_LOCATIONS_PAGE:
            return { ...state, locationsActivePage: action.page, locationsPageSize: action.pageSize, locationsTotalPages: action.totalPages };
        default:
            return state;
    }
}

export default locationPaginationReducer;