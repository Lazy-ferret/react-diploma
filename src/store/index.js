import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import categoriesReducer from "../reducers/categories";
import catalogReducer from "../reducers/catalog";
import cartReducer from "../reducers/cart";
import itemReducer from "../reducers/item";
import orderReducer from "../reducers/order";
import topSalesReducer from "../reducers/topSales";


const reducer = combineReducers({
  topSales: topSalesReducer,
  categories: categoriesReducer, 
  catalog: catalogReducer, 
  item: itemReducer, 
  cart: cartReducer,
  order: orderReducer,
 
});

const store = createStore(
  reducer,
  compose (
    applyMiddleware(thunk, logger), 
    window.__REDUX_DEVTOOLS_EXTENSION__ 
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : f => f
)
);

export default store;
