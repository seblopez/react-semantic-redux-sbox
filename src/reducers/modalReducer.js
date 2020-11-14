import { OPEN_MODAL, CLOSE_MODAL } from "../actions/types";

const INITIAL_STATE = {
    open: false,
    dimmer: undefined
};

const modalReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case OPEN_MODAL:
            return { ...state, open: true, dimmer: action.dimmer, index: action.index };
        case CLOSE_MODAL:
            return { ...state, open: false, dimmer: undefined, index: undefined };
        default:
            return state;
    }
};

export default modalReducer;