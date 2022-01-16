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

export const fetchItem = async (id, dispatch) => {
    dispatch(fetchItemRequest());
    try {
        const response = await fetch(`${process.env.REACT_APP_ITEMS_URL}/${id}`);
        if (!response.ok) {
            throw new Error(response.statusText);
        };
        const data = await response.json();
        dispatch(fetchItemSuccess(data));
    } catch (e) {
        dispatch(fetchItemFailure(e.message));
    }
};

export const addItemSize = (size) => async dispatch => {
    dispatch({
        type: ADD_ITEM_SIZE,
        payload: {
            size
        }
    })
};

export const deleteItemSize = () => async dispatch => {
    dispatch({
        type: DELETE_ITEM_SIZE
    })
};

export const changeItemQuantity = (quantity) => async dispatch => {
    dispatch({
        type: CHANGE_ITEM_QUANTITY,
        payload: {
            quantity
        }
    })
};
