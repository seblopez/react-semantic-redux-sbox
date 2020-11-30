import {HIDE_MENU, SHOW_MENU} from "../actions/types";

const INITIAL_STATE = {
    menuVisible: false
}
const menuReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case HIDE_MENU:
            return { ...state, menuVisible: false };
        case SHOW_MENU:
            return { ...state, menuVisible: true };
        default:
            return state;
    }
}

export default menuReducer;