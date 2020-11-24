import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form';
import deleteContactModalReducer from './deleteContactModalReducer'
import contactPaginationReducer from './contactPaginationReducer';
import deleteLocationModalReducer from './deleteLocationModalReducer';
import locationPaginationReducer from  './locationPaginationReducer';

export default combineReducers({ form: formReducer,
    deleteContactModal: deleteContactModalReducer,
    deleteLocationModal: deleteLocationModalReducer,
    contactPagination: contactPaginationReducer,
    locationPagination: locationPaginationReducer} );