import {CREATE_VENDOR, EDIT_VENDOR, FETCH_VENDOR, FETCH_VENDORS} from "../actions/types";

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_VENDOR:
        case FETCH_VENDORS:
        case EDIT_VENDOR:
        case CREATE_VENDOR:
            return {...state, payload: action.payload};
        default:
            return state;

    }
}