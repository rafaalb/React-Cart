import {
  ADD_TO_CART,
  UPDATE_QUANTITY,
  REMOVE_PRODUCT,
  RESET_CART
} from './action_types';

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product
});

export const updateQuantity = (quantity, id) => ({
  type: UPDATE_QUANTITY,
  payload: {
    quantity,
    id
  }
});

export const removeProduct = (id) => ({
  type: REMOVE_PRODUCT,
  payload: id
});

export const resetCart = () => ({
  type: RESET_CART
});
