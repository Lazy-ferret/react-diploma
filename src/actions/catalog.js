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

export const fetchCatalog = async (dispatch) => {
    dispatch(fetchCatalogRequest());
    try {
        const response = await fetch(`${process.env.REACT_APP_ITEMS_URL}`);
        if (!response.ok) {
            throw new Error(response.statusText);
        };
        const data = await response.json();
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

export const fetchLoadMore = async (id, dispatch) => {
    dispatch(fetchLoadMoreRequest(id));
    try {
        if (!id) {
            const response = await fetch(`${process.env.REACT_APP_ITEMS_URL}?offset=${OFFSET}`);
            const data = await response.json();
            dispatch(fetchCatalogSuccess(data));
        } else {
            const response = await fetch(`${process.env.REACT_APP_ITEMS_URL}?categoryId=${id}&offset=${OFFSET}`);
            const data = await response.json();
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

export const FetchSearchTextItems = async (searchText, id, dispatch) => {
    dispatch(fetchSearchText(searchText, id));
    const respCatalog = await fetch(`${process.env.REACT_APP_ITEMS_URL}?q=${searchText}`);
    const respCurrentCategory = await fetch(`${process.env.REACT_APP_ITEMS_URL}?categoryId=${id}&q=${searchText}`);
    const response = (!id) ? respCatalog : respCurrentCategory;
    const data = await response.json();
    dispatch(fetchCatalogSuccess(data));
};
