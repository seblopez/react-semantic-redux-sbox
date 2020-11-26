import { OPEN_DELETE_MODAL, CLOSE_DELETE_MODAL } from "../actions/types";

const INITIAL_STATE = {
    open: false,
    dimmer: undefined
};

const deleteModalReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case OPEN_DELETE_MODAL:
            return { ...state, open: true, dimmer: action.dimmer, index: action.index };
        case CLOSE_DELETE_MODAL:
            return { ...state, open: false, dimmer: undefined, index: undefined };
        default:
            return state;
    }
};

export default deleteModalReducer;