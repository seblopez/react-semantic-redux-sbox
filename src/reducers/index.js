import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import deleteModalReducer from './deleteModalReducer';
import contactPaginationReducer from './contactPaginationReducer';
import locationPaginationReducer from  './locationPaginationReducer';
import cityChangeReducer from './cityChangeReducer';
import menuReducer from './menuReducer';

export default combineReducers({ form: formReducer,
    deleteModal: deleteModalReducer,
    contactPagination: contactPaginationReducer,
    locationPagination: locationPaginationReducer,
    cityChanged: cityChangeReducer,
    menuVisible: menuReducer
});