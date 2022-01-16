
import {
    FETCH_CATEGORIES_REQUEST,
    FETCH_CATEGORIES_FAILURE,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CHOOSEN_CATEGORY_REQUEST,
    FETCH_CHOOSEN_CATEGORY_SUCCESS
} from "./actionTypes";
import { fetchCatalog, fetchCatalogSuccess } from "./catalog";

export const fetchCategoriesRequest = () => ({
    type: FETCH_CATEGORIES_REQUEST,
});

export const fetchCategoriesFailure = (error) => ({
    type: FETCH_CATEGORIES_FAILURE,
    payload: {
        error
    }
});

export const fetchCategoriesSuccess = (items) => ({
    type: FETCH_CATEGORIES_SUCCESS,
    payload: {
        items
    }
});

export const fetchCategories = async dispatch => {
    dispatch(fetchCategoriesRequest());
    try {
        const response = await fetch(`${process.env.REACT_APP_CATEGORIES_URL}`);
        if (!response.ok) {
            throw new Error(response.statusText);
        };
        const data = await response.json();
        dispatch(fetchCategoriesSuccess(data));
    } catch (e) {
        dispatch(fetchCategoriesFailure(e.message));
    }
}

export const fetchChoosenCategoryRequest = (id) => ({
    type: FETCH_CHOOSEN_CATEGORY_REQUEST,
    payload: {
        id
    }
});

export const fetchChoosenCategorySuccess = (items) => ({
    type: FETCH_CHOOSEN_CATEGORY_SUCCESS,
    payload: {
        items
    }
});

export const fetchCategoryItems = async (id, dispatch) => {
    dispatch(fetchChoosenCategoryRequest(id));
    try {
        const response = await fetch(`${process.env.REACT_APP_ITEMS_URL}?categoryId=${id}`);
        if (!response.ok) {
            throw new Error(response.statusText);
        } else if (!id) {
            fetchCatalog(dispatch);
        };
        const data = await response.json();
        dispatch(fetchCatalogSuccess(data, id));
        dispatch(fetchChoosenCategorySuccess());
    } catch (e) {
        dispatch(fetchCategoriesFailure(e.message));
    }
};
