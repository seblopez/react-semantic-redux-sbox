import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form';
import modalReducer from './modalReducer'
import contactPaginationReducer from './contactPaginationReducer';

export default combineReducers({ form: formReducer, modal: modalReducer, contactPagination: contactPaginationReducer } );