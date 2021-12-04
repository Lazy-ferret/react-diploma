import {
    FETCH_ITEM_REQUEST,
    FETCH_ITEM_FAILURE,
    FETCH_ITEM_SUCCESS,
    ADD_ITEM_SIZE,
    DELETE_ITEM_SIZE,
    CHANGE_ITEM_QUANTITY
} from "../actions/actionTypes";

const initialState = {
    item: {},
    loading: false,
    error: null,
    size: null,
    quantity: null
};

export default function itemReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_ITEM_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_ITEM_FAILURE:
            const { error } = action.payload;
            return {
                ...state,
                loading: false,
                error
            };
        case FETCH_ITEM_SUCCESS:
            const { item } = action.payload;
            return {
                ...state,
                item,
                loading: false,
                error: null,
            };
        case ADD_ITEM_SIZE:
            const { size } = action.payload;
            return {
                ...state,
                size,
                loading: false,
                error: null,
            };
        case DELETE_ITEM_SIZE:
            return {
                ...state,
                size: null
            };
        case CHANGE_ITEM_QUANTITY:
            const { quantity } = action.payload;
            return {
                ...state,
                quantity,
                loading: false,
                error: null
            };
        default:
            return state;
    }
};
