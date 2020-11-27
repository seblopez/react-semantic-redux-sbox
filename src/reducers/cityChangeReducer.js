import {CITY_CHANGED} from "../actions/types";

const INITIAL_STATE = {
    cityState: ''
}

const cityChangeReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CITY_CHANGED:
            return { ...state, cityState: action.cityState, cityIndex: action.cityIndex, cityCountry: action.cityCountry };
        default:
            return state;
    }
}

export default cityChangeReducer;