import {
  INIT_PRODUCT,
  FETCH_PRODUCT,
  SUBLEVELS_PRODUCT,
  GET_PRODUCTS_BY_SUB_LEVEL,
  SORT_PRODUCTS,
  FILTER_PRODUCTS
} from './../actions/action_types' 

import Money from './../transforms/Money' 

const initialState = {
  data: [],
  filters: {
    minPrice: null,
    maxPrice: 10000 * 1000,
    minQuantity: null,
    maxQuantity: 1000 * 1000,
    availability: null
  }
}
export const products = (state = initialState, action) => {
  switch (action.type) {
    case INIT_PRODUCT:
      return { ...state, data: action.payload } 
    case GET_PRODUCTS_BY_SUB_LEVEL:
      return { ...state, data: action.payload } 
    case SORT_PRODUCTS:
      const sorted = state.data.concat().sort((a, b) => {
        let keyA = a[action.payload] 
        let keyB = b[action.payload] 
        if (action.payload === 'price') {
          keyA = Money(keyA) 
          keyB = Money(keyB) 
        }
        return keyA - keyB 
      }) 
      return { ...state, data: sorted } 
    case FILTER_PRODUCTS:
      return { ...state, filters: action.filters } 
    default:
      return state 
  }
} 

export const activeProduct = (state = [], action) => {
  switch (action.type) {
    case FETCH_PRODUCT:
      return action.payload 
    default:
      return state 
  }
} 

export const sublevels = (state = [], action) => {
  switch (action.type) {
    case SUBLEVELS_PRODUCT:
      return action.payload 
    default:
      return state 
  }
} 
