import {
    FETCH_TOP_SALES_FAILURE,
    FETCH_TOP_SALES_REQUEST,
    FETCH_TOP_SALES_SUCCESS
} from "../actions/actionTypes";

const initialState = {
    items: [],
    loading: false,
    error: null,
};

export default function topSalesReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_TOP_SALES_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_TOP_SALES_FAILURE:
            const { error } = action.payload;
            return {
                ...state,
                loading: false,
                error
            };
        case FETCH_TOP_SALES_SUCCESS:
            const { items } = action.payload;
            return {
                ...state,
                items,
                loading: false,
                error: null,
            };
        default:
            return state;
    }
};
