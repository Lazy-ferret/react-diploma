import {
    ADD_PRODUCT, CLEAR_STORAGE, DELETE_PRODUCT
} from "../actions/actionTypes";

const initialState = {
    cart: JSON.parse(localStorage.getItem('cart')) || []
}

export default function cartReducer(state = initialState, action) {
    let newCart
    const stateCart = state.cart
    switch (action.type) {
        case ADD_PRODUCT:
            const updCart = action.payload
            if (stateCart.length) {
                const indexCart = stateCart.findIndex((item) => item.id === updCart.id);
                if (indexCart !== -1) {
                    newCart = [...stateCart];
                    newCart[indexCart] = {
                        ...newCart[indexCart],
                        quantity: Number(newCart[indexCart].quantity) + Number(updCart.quantity)
                    }
                } else {
                    newCart = [...stateCart, updCart]
                }
            } else {
                newCart = [updCart]
            }
            localStorage.setItem('cart', JSON.stringify(newCart))
            return {
                ...state,
                cart: newCart
            }

        case DELETE_PRODUCT:
            const id = action.payload
            newCart = stateCart.filter(item => item.id !== id);
            localStorage.setItem('cart', JSON.stringify(newCart))
            return {
                ...state,
                cart: newCart
            }

        case CLEAR_STORAGE:
            localStorage.clear();
            return {
                ...state,
                cart: []
            };

        default:
            return state;
    }
};
