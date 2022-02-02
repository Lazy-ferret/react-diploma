import { requestCatalogItems, requestCategoryLoadMore, requestLoadMore, requestSearchText } from "../lib/api";
import {
    FETCH_CATALOG_REQUEST,
    FETCH_CATALOG_FAILURE,
    FETCH_CATALOG_SUCCESS,
    FETCH_LOAD_MORE,    
    ADD_SEARCH_TEXT,
    FETCH_SEARCH_TEXT
} from "./actionTypes";
import { fetchCategoriesFailure, fetchChoosenCategorySuccess } from "./categories";

let OFFSET = 6;

export const fetchCatalogRequest = () => ({
    type: FETCH_CATALOG_REQUEST,
});

export const fetchCatalogFailure = (error) => ({
    type: FETCH_CATALOG_FAILURE,
    payload: {
        error
    }
});

export const fetchCatalogSuccess = (items, id) => ({
    type: FETCH_CATALOG_SUCCESS,
    payload: {
        items,
        id
    }
});

export const fetchCatalog = () => async dispatch => {
    dispatch(fetchCatalogRequest());
    try {
        const data = await requestCatalogItems();
        dispatch(fetchCatalogSuccess(data));
    } catch (e) {
        dispatch(fetchCatalogFailure(e.message));
    }
};

export const fetchLoadMoreRequest = (id) => ({
    type: FETCH_LOAD_MORE,
    payload: {
        id
    }
});

export const fetchLoadMore = (id) => async dispatch => {    
    dispatch(fetchLoadMoreRequest(id));
    try {
        if (!id) {
            const data = await requestLoadMore(OFFSET);
            dispatch(fetchCatalogSuccess(data));
        } else {
            const data = await requestCategoryLoadMore(OFFSET, id);
            dispatch(fetchCatalogSuccess(data));
            dispatch(fetchChoosenCategorySuccess());
        };
        OFFSET = OFFSET + 6;
    } catch (e) {
        dispatch(fetchCategoriesFailure(e.message));
    }
};

//Search actions
export const addSearchText = (searchText) => ({
    type: ADD_SEARCH_TEXT,
    payload: {
        searchText
    }
});

export const fetchSearchText = (searchText, id) => ({
    type: FETCH_SEARCH_TEXT,
    payload: {
        searchText,
        id
    }
});

export const fetchSearchTextItems = (searchText, id) => async dispatch => {
    dispatch(fetchSearchText(searchText, id));
    const data = await requestSearchText(searchText, id);
    dispatch(fetchCatalogSuccess(data));  
};
