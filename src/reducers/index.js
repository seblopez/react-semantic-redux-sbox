import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import deleteModalReducer from './deleteModalReducer';
import contactPaginationReducer from './contactPaginationReducer';
import locationPaginationReducer from  './locationPaginationReducer';
import cityChangeReducer from './cityChangeReducer';
import menuReducer from './menuReducer';
import authReducer from "./authReducer";
import tableSortReducer from "./tableSortReducer";
import vendorListPaginationReducer from "./vendorListPaginationReducer";
import vendorReducer from "./vendorReducer";

export default combineReducers({ form: formReducer,
    vendor: vendorReducer,
    deleteModal: deleteModalReducer,
    contactPagination: contactPaginationReducer,
    locationPagination: locationPaginationReducer,
    vendorListPagination: vendorListPaginationReducer,
    cityChanged: cityChangeReducer,
    menuVisible: menuReducer,
    auth: authReducer,
    sorting: tableSortReducer
});