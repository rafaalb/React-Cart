import {
  INIT_PRODUCT,
  FETCH_PRODUCT,
  SUBLEVELS_PRODUCT,
  GET_PRODUCTS_BY_SUB_LEVEL,
  SORT_PRODUCTS,
  FILTER_PRODUCTS
} from './../actions/action_types';

import Money from './../transforms/Money';

export const products = (state = [], action) => {
  switch (action.type) {
    case INIT_PRODUCT:
      return action.payload;
    case GET_PRODUCTS_BY_SUB_LEVEL:
      return action.payload;
    case SORT_PRODUCTS:
      return state.concat().sort((a, b) => {
        let keyA = a[action.payload];
        let keyB = b[action.payload];
        if (action.payload === 'price') {
          keyA = Money(keyA);
          keyB = Money(keyB);
        }
        return keyA - keyB;
      });
    case FILTER_PRODUCTS:
      return action.payload.products.filter((prod) => {
          let maxP = action.payload.filterP.maxPrice === 0
                    || action.payload.filterP.maxPrice === ""
                        ? 999999 : action.payload.filterP.maxPrice;
          let maxQ = action.payload.filterP.maxQuantity === 0
                    || action.payload.filterP.maxQuantity === ""
                        ? 999999 : action.payload.filterP.maxQuantity;
          return (
            (Number(action.payload.filterP.minPrice) < Number(Money(prod.price)))
              && (Number(maxP) > Number(Money(prod.price)))
              && (Number(action.payload.filterP.minQuantity) < Number(prod.quantity))
              && (Number(maxQ) > Number(prod.quantity))
              && ((action.payload.filterP.availability === 'available' && prod.available)
              || (action.payload.filterP.availability === 'notavailable' && !prod.available)
              || (!action.payload.filterP.availability && !prod.available) )
          );
      });
    default:
      return state;
  }
};

export const activeProduct = (state = [], action) => {
  switch (action.type) {
    case FETCH_PRODUCT:
      return action.payload;
    default:
      return state;
  }
};

export const sublevels = (state = [], action) => {
  switch (action.type) {
    case SUBLEVELS_PRODUCT:
      return action.payload;
    default:
      return state;
  }
};
