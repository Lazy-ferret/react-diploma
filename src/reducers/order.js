import {
    FETCH_ORDER_REQUEST,
    FETCH_ORDER_FAILURE,
    FETCH_ORDER_SUCCESS,
    ADD_ORDER_PHONE,
    ADD_ORDER_ADDRESS,
    ADD_ORDER_AGREEMENT,
    INIT_ORDER
} from "../actions/actionTypes";

const initialState = {
    phone: '',
    address: '',
    error: null,
    loading: false,
    agreement: false,
    ordered: false
};

export default function orderReducer(state = initialState, action) {
    switch (action.type) {
        case INIT_ORDER:
            return {
                phone: '',
                address: '',
                error: null,
                loading: false,
                agreement: false,
                ordered: false
            };
        case FETCH_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_ORDER_FAILURE:
            const { error } = action.payload;
            return {
                ...state,
                loading: false,
                error
            };
        case FETCH_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                ordered: true
            };
        case ADD_ORDER_PHONE:
            const { phone } = action.payload;
            return {
                ...state,
                phone
            };
        case ADD_ORDER_ADDRESS:
            const { address } = action.payload;
            return {
                ...state,
                address
            };
        case ADD_ORDER_AGREEMENT:
            const { agreement } = action.payload;
            return {
                ...state,
                agreement
            };
        default:
            return state;
    }
};
