import {
    ADD_PRODUCT, CLEAR_STORAGE, DELETE_PRODUCT
} from "../actions/actionTypes";

export const addProduct = (cart) => async dispatch => {
    dispatch(
        {
            type: ADD_PRODUCT, payload: cart
        }
    )
}

export const deleteProduct = (cart) => async dispatch => {
    dispatch(
        {
            type: DELETE_PRODUCT, payload: cart
        }
    )
}


export const clearStorage = () => (
    {
        type: CLEAR_STORAGE
    }
)
