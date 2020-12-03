import { applyMiddleware, combineReducers, createStore } from 'redux';

import thunk from 'redux-thunk';

// actions.js
export const getProducts = (products) => ({
  type: 'GET_PRODUCTS',
  products,
});

export const clearProducts = () => ({ type: 'CLEAR_PRODUCTS' });

export const fetchProducts = (pageNo) => {
  return async dispatch => {
    try {
      const url = `https://mobile-tha-server-8ba57.firebaseapp.com/walmartproducts/${pageNo}/8`;
      const response = await fetch(url)
      const responseBody = await response.json();
      dispatch(getProducts(responseBody));
    } catch (error) {
      console.error(error);
      dispatch(clearProducts());
    }
  }
}

// reducers.js
export const products = (state = [], action) => {
  switch (action.type) {
    case 'GET_PRODUCTS':
      return action.products;
    case 'CLEAR_PRODUCTS':
      return [];
    default:
      return state;
  }
};

export const reducers = combineReducers({ products });

// store.js
export function configureStore(initialState = {}) {
  const store = createStore(reducers, initialState, applyMiddleware(thunk));
  return store;
}

export const store = configureStore();
