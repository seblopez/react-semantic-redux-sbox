import {
    // MOVE_TO_CONTACTS_PAGE,
    // MOVE_TO_LOCATIONS_PAGE,
    OPEN_DELETE_MODAL,
    CLOSE_DELETE_MODAL,
    CITY_CHANGED,
    HIDE_MENU,
    SHOW_MENU,
    SIGN_IN,
    SIGN_OUT,
    CHANGE_SORT, FETCH_VENDOR, EDIT_VENDOR, CREATE_VENDOR
} from "./types";
import {vendorList} from "../data";
import {vendorTransformer} from "../transformers";

export const openDeleteModal = index => {
    return {
        type: OPEN_DELETE_MODAL,
        dimmer:'blurring',
        index: index
    };
}

export const closeDeleteModal = () => {
    return {
        type: CLOSE_DELETE_MODAL
    };
}

export const moveToPage = pageData => {
    return pageData;
}

export const cityChanged = cityData => {
    return {
        type: CITY_CHANGED,
        cityState: cityData.cityState,
        cityIndex: cityData.cityIndex,
        cityCountry: cityData.cityCountry
    };
}

export const hideMenu = () => {
    return {
        type: HIDE_MENU
    };
}

export const showMenu = () => {
    return {
        type: SHOW_MENU
    };
}

export const signIn = userId => {
    return {
        type: SIGN_IN,
        payload: userId
    }
};

export const signOut = () => {
    return {
        type: SIGN_OUT,
        payload: null
    }
};

export const changeSort = () => {
    return {
        type: CHANGE_SORT
    }
};

export const fetchVendor = id => {
    const response = vendorList.find(vendor => vendor.id === id);
    return {type: FETCH_VENDOR, payload: response};
}

export const editVendor = (id, formValues) => {
    const submitValues = vendorTransformer(formValues);
    window.alert(JSON.stringify(submitValues, null, 2));
    console.log(JSON.stringify(submitValues, null, 2));

    return {type: EDIT_VENDOR, payload: submitValues};

}

export const createVendor = formValues => {
    const submitValues = vendorTransformer(formValues);
    window.alert(JSON.stringify(submitValues, null, 2));
    console.log(JSON.stringify(submitValues, null, 2));

    return {type: CREATE_VENDOR, payload: submitValues};

}