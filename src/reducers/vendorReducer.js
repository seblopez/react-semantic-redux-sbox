import {CREATE_VENDOR, EDIT_VENDOR, FETCH_VENDOR} from "../actions/types";

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_VENDOR:
        case EDIT_VENDOR:
        case CREATE_VENDOR:
            return {...state, payload: action.payload};
        default:
            return state;

    }
}