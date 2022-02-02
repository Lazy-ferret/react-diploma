import { requestItem } from "../lib/api";
import {
    FETCH_ITEM_REQUEST,
    FETCH_ITEM_FAILURE,
    FETCH_ITEM_SUCCESS,
    ADD_ITEM_SIZE,
    DELETE_ITEM_SIZE,
    CHANGE_ITEM_QUANTITY
} from "./actionTypes";

export const fetchItemRequest = (id) => ({
    type: FETCH_ITEM_REQUEST,
    payload: {
        id
    }
});

export const fetchItemFailure = (error) => ({
    type: FETCH_ITEM_FAILURE,
    payload: {
        error
    }
});

export const fetchItemSuccess = (item) => ({
    type: FETCH_ITEM_SUCCESS,
    payload: {
        item
    }
});

export const fetchItem = (id) => async dispatch => {
    dispatch(fetchItemRequest());
    try {
        const data = await requestItem(id);
        dispatch(fetchItemSuccess(data));
    } catch (e) {
        dispatch(fetchItemFailure(e.message));
    }
};

export const addItemSize = (size) => ({
    type: ADD_ITEM_SIZE,
    payload: {
        size
    }
});

export const deleteItemSize = () => ({
    type: DELETE_ITEM_SIZE
});

export const changeItemQuantity = (quantity) => ({
    type: CHANGE_ITEM_QUANTITY,
    payload: {
        quantity
    }
});
