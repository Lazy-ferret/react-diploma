import {
    ADD_PRODUCT, CLEAR_STORAGE, DELETE_PRODUCT
} from "../actions/actionTypes";

export const addProduct = (cart) => (
    {
        type: ADD_PRODUCT, payload: cart
    }
);

export const deleteProduct = (cart) => (
    {
        type: DELETE_PRODUCT, payload: cart
    }
);

export const clearStorage = () => (
    {
        type: CLEAR_STORAGE
    }
);
