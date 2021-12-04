import {
    FETCH_TOP_SALES_REQUEST,
    FETCH_TOP_SALES_FAILURE,
    FETCH_TOP_SALES_SUCCESS,
    FETCH_CATEGORIES_REQUEST,
    FETCH_CATEGORIES_FAILURE,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CHOOSEN_CATEGORY_REQUEST,
    FETCH_CHOOSEN_CATEGORY_SUCCESS,
    FETCH_CATALOG_REQUEST,
    FETCH_CATALOG_FAILURE,
    FETCH_CATALOG_SUCCESS,
    FETCH_LOAD_MORE,
    ADD_SEARCH_TEXT,
    FETCH_SEARCH_TEXT,
    FETCH_ITEM_REQUEST,
    FETCH_ITEM_FAILURE,
    FETCH_ITEM_SUCCESS,
    ADD_ITEM_SIZE,
    DELETE_ITEM_SIZE,
    CHANGE_ITEM_QUANTITY,
    GET_CART_ITEMS,
    GET_CART_SUM,
    CART_FAILURE,
    CART_SUCCESS,
    CLEAR_STORAGE,
    FETCH_ORDER_REQUEST,
    FETCH_ORDER_FAILURE,
    FETCH_ORDER_SUCCESS,
    ADD_ORDER_PHONE,
    ADD_ORDER_ADDRESS,
    ADD_ORDER_AGREEMENT,
    INIT_ORDER
} from "./actionTypes";

// Const
let OFFSET = 6;

//TopSales actions
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

//Categories actions
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

//Catalog actions
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

// Item actions
export const fetchItemRequest = (id) => ({
    type: FETCH_ITEM_REQUEST,
    payload: {
        id
    }
});

export const fetchItemFailure = (error) => ({
    type: FETCH_ITEM_FAILURE,
    payload: {
        error
    }
});

export const fetchItemSuccess = (item) => ({
    type: FETCH_ITEM_SUCCESS,
    payload: {
        item
    }
});

export const fetchItem = async (id, dispatch) => {
    dispatch(fetchItemRequest());
    try {
        const response = await fetch(`${process.env.REACT_APP_ITEMS_URL}/${id}`);
        if (!response.ok) {
            throw new Error(response.statusText);
        };
        const data = await response.json();
        dispatch(fetchItemSuccess(data));
    } catch (e) {
        dispatch(fetchItemFailure(e.message));
    }
};

export const addItemSize = (size) => async dispatch => {
    dispatch({
        type: ADD_ITEM_SIZE,
        payload: {
            size
        }
    })
};

export const deleteItemSize = () => async dispatch => {
    dispatch({
        type: DELETE_ITEM_SIZE
    })
};

export const changeItemQuantity = (quantity) => async dispatch => {
    dispatch({
        type: CHANGE_ITEM_QUANTITY,
        payload: {
            quantity
        }
    })
};

// Cart actions
export const cartFailure = (error) => ({
    type: CART_FAILURE,
    payload: {
        error
    }
});

export const cartSuccess = () => ({
    type: CART_SUCCESS
});

export const getCartItems = (storageItems) => async dispatch => {
    dispatch({
        type: GET_CART_ITEMS,
        payload: {
            storageItems
        }
    })
};

export const getCartSum = (sum) => async dispatch => {
    dispatch({
        type: GET_CART_SUM,
        payload: {
            sum
        }
    })
};

export const addCartItem = (cart, object, updateCart) => async dispatch => {
    if (cart.length) {
        const indexCart = cart.findIndex((item) => item.id === object.id);
        if (indexCart !== -1) {
            let newCart = [...cart];
            newCart[indexCart] = {
                ...newCart[indexCart],
                quantity: Number(newCart[indexCart].quantity) + Number(object.quantity)
            }
            dispatch({
                type: GET_CART_ITEMS,
                payload: {
                    newCart
                }
            });
            localStorage.setItem('cart', JSON.stringify(newCart));
        } else {
            dispatch({
                type: GET_CART_ITEMS,
                payload: {
                    updateCart
                }
            });
            localStorage.setItem('cart', JSON.stringify(updateCart));
        }
    } else {
        dispatch({
            type: GET_CART_ITEMS,
            payload: {
                updateCart
            }
        });
        localStorage.setItem('cart', JSON.stringify(updateCart));
    }
};

export const clearStorage = () => async dispatch => {
    dispatch({
        type: CLEAR_STORAGE
    });
    localStorage.clear();
};

// Odrer actions
export const initOrder = () => ({
    type: INIT_ORDER
});

export const fetchOrderRequest = () => ({
    type: FETCH_ORDER_REQUEST
});

export const fetchOrderFailure = (error) => ({
    type: FETCH_ORDER_FAILURE,
    payload: {
        error
    }
});

export const fetchOrderSuccess = () => ({
    type: FETCH_ORDER_SUCCESS
});

export const postOrder = (currentOrder) => async dispatch => {
    dispatch(fetchOrderRequest());
    try {
        const response = await fetch(`${process.env.REACT_APP_ORDER_URL}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(currentOrder),
            });
        if (!response.ok) {
            throw new Error(response.statusText);
        };
        dispatch(fetchOrderSuccess());
        dispatch(clearStorage());
    } catch (e) {
        dispatch(fetchOrderFailure(e.message));
    }
};

export const addOrderPhone = (id, value) => ({
    type: ADD_ORDER_PHONE,
    payload: {
        [id]: value
    }
});

export const addOrderAddress = (id, value) => ({
    type: ADD_ORDER_ADDRESS,
    payload: {
        [id]: value
    }
});

export const addOrderAgreement = (id, status) => ({
    type: ADD_ORDER_AGREEMENT,
    payload: {
        [id]: status
    }
});
