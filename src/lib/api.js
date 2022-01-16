import { fetchCatalog } from "../actions/catalog";

export const requestTopSales = async () => {
    const response = await fetch(`${process.env.REACT_APP_TOP_SALES_URL}`);
    if (!response.ok) {
        throw new Error(response.statusText);
    };
    const data = await response.json();
    return data;
}

export const requestCategories = async () => {
    const response = await fetch(`${process.env.REACT_APP_CATEGORIES_URL}`);
    if (!response.ok) {
        throw new Error(response.statusText);
    };
    const data = await response.json();
    return data;
}

export const requestChoosenCategory = async (id, dispatch) => {
    const response = await fetch(`${process.env.REACT_APP_ITEMS_URL}?categoryId=${id}`);
    if (!response.ok) {
        throw new Error(response.statusText);
    } else if (!id) {
        fetchCatalog(dispatch);
    };
    const data = await response.json();
    return data;
}

export const requestCatalogItems = async () => {
    const response = await fetch(`${process.env.REACT_APP_ITEMS_URL}`);
    if (!response.ok) {
        throw new Error(response.statusText);
    };
    const data = await response.json();
    return data;
}

export const requestLoadMore = async (OFFSET) => {
    const response = await fetch(`${process.env.REACT_APP_ITEMS_URL}?offset=${OFFSET}`);
    const data = await response.json();
    return data;
}

export const requestCategoryLoadMore = async (OFFSET, id) => {
    const response = await fetch(`${process.env.REACT_APP_ITEMS_URL}?categoryId=${id}&offset=${OFFSET}`);
    const data = await response.json();
    return data;
}

export const requestItem = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_ITEMS_URL}/${id}`);
    if (!response.ok) {
        throw new Error(response.statusText);
    };
    const data = await response.json();
    return data;
}

export const requestSearchText = async (searchText, id) => {
    const respCatalog = await fetch(`${process.env.REACT_APP_ITEMS_URL}?q=${searchText}`);
    const respCurrentCategory = await fetch(`${process.env.REACT_APP_ITEMS_URL}?categoryId=${id}&q=${searchText}`);
    const response = (!id) ? respCatalog : respCurrentCategory;
    const data = await response.json();
    return data;
}


export const createOrder = async (newOrder) => {
    const response = await fetch(`${process.env.REACT_APP_ORDER_URL}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newOrder),
        });
    if (!response.ok) {
        throw new Error(response.statusText);
    };
}



