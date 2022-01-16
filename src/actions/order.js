import {
    FETCH_ORDER_REQUEST,
    FETCH_ORDER_FAILURE,
    FETCH_ORDER_SUCCESS,
    ADD_ORDER_PHONE,
    ADD_ORDER_ADDRESS,
    ADD_ORDER_AGREEMENT,
    INIT_ORDER
} from "./actionTypes";
import { clearStorage } from "./cart";

export const initOrder = () => ({
    type: INIT_ORDER
});

export const fetchOrderRequest = () => ({
    type: FETCH_ORDER_REQUEST
});

export const fetchOrderFailure = (error) => ({
    type: FETCH_ORDER_FAILURE,
    payload: {
        error
    }
});

export const fetchOrderSuccess = () => ({
    type: FETCH_ORDER_SUCCESS
});

export const postOrder = (currentOrder) => async dispatch => {
    dispatch(fetchOrderRequest());
    try {
        const response = await fetch(`${process.env.REACT_APP_ORDER_URL}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(currentOrder),
            });
        if (!response.ok) {
            throw new Error(response.statusText);
        };
        dispatch(fetchOrderSuccess());
        dispatch(clearStorage());
    } catch (e) {
        dispatch(fetchOrderFailure(e.message));
    }
};

export const addOrderPhone = (id, value) => ({
    type: ADD_ORDER_PHONE,
    payload: {
        [id]: value
    }
});

export const addOrderAddress = (id, value) => ({
    type: ADD_ORDER_ADDRESS,
    payload: {
        [id]: value
    }
});

export const addOrderAgreement = (id, status) => ({
    type: ADD_ORDER_AGREEMENT,
    payload: {
        [id]: status
    }
});