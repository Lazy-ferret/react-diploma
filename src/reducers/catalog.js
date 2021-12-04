import {
    FETCH_CATALOG_REQUEST,
    FETCH_CATALOG_FAILURE,
    FETCH_CATALOG_SUCCESS,
    FETCH_LOAD_MORE,
    ADD_SEARCH_TEXT,
    FETCH_SEARCH_TEXT
} from "../actions/actionTypes";

const initialState = {
    items: [],
    loading: false,
    error: null,
    currentCategory: null,
    searchText: ''
};

export default function catalogReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_CATALOG_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_CATALOG_FAILURE:
            const { error } = action.payload;
            return {
                ...state,
                loading: false,
                error
            };
        case FETCH_CATALOG_SUCCESS:
            const { items, id } = action.payload;
            return {
                ...state,
                currentCategory: id,
                items,
                loading: false,
                error: null,
            };
        case FETCH_LOAD_MORE:
            return {
                ...state,
                loading: true,
                error: null
            };
        case ADD_SEARCH_TEXT:
            const { searchText } = action.payload;
            return {
                ...state,
                searchText,
            };
        case FETCH_SEARCH_TEXT:
            return {
                ...state,
                loading: true,
                error: null,
            };
        default:
            return state;
    }
};
