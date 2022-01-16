import {
    FETCH_TOP_SALES_REQUEST,
    FETCH_TOP_SALES_FAILURE,
    FETCH_TOP_SALES_SUCCESS    
} from "./actionTypes";

export const fetchTopSalesRequest = () => ({
    type: FETCH_TOP_SALES_REQUEST
});

export const fetchTopSalesFailure = (error) => ({
    type: FETCH_TOP_SALES_FAILURE,
    payload: {
        error
    }
});

export const fetchTopSalesSuccess = (items) => ({
    type: FETCH_TOP_SALES_SUCCESS,
    payload: {
        items
    }
});

export const fetchTopSales = async dispatch => {
    dispatch(fetchTopSalesRequest());
    try {
        const response = await fetch(`${process.env.REACT_APP_TOP_SALES_URL}`);
        if (!response.ok) {
            throw new Error(response.statusText);
        };
        const data = await response.json();
        dispatch(fetchTopSalesSuccess(data));
    } catch (e) {
        dispatch(fetchTopSalesFailure(e.message));
    }
};
