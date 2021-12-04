import {
    GET_CART_ITEMS,
    GET_CART_SUM,
    CART_FAILURE,
    CART_SUCCESS,
    CLEAR_STORAGE
} from "../actions/actionTypes";

const initialState = {
    cart: [],
    loading: false,
    error: null,
    sum: null
};

export default function cartReducer(state = initialState, action) {
    switch (action.type) {
        case CART_FAILURE:
            const { error } = action.payload;
            return {
                ...state,
                loading: false,
                error
            };
        case CART_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
            };
        case GET_CART_ITEMS:
            return {
                ...state,
                cart: action.payload
            };
        case GET_CART_SUM:
            const { sum } = action.payload
            return {
                ...state,
                sum
            };
        case CLEAR_STORAGE:
            localStorage.removeItem('cart')
            return {
                ...state,
                cart: []
            };
        default:
            return state;
    }
};
