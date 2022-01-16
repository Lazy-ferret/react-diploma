import {
    GET_CART_ITEMS,
    GET_CART_SUM,
    CART_FAILURE,
    CART_SUCCESS,
    CLEAR_STORAGE
} from "./actionTypes";

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
