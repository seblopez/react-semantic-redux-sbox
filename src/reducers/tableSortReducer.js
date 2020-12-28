import {CHANGE_SORT} from "../actions/types";
import _ from 'lodash';

const INITIAL_STATE = {
    column: null,
    data: null,
    direction: null,
};

const tableSortReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'CHANGE_SORT':
            if (state.column === action.column) {
                return {
                    ...state,
                    data: state.data.reverse(),
                    direction:
                        state.direction === 'ascending' ? 'descending' : 'ascending',
                }
            }

            return {
                column: action.column,
                data: _.sortBy(state.data, [action.column]),
                direction: 'ascending'
            }

        default:
            return state;
    }
}

export default tableSortReducer;