import API from './../services/fixture_api' 

import {
  INIT_PRODUCT,
  FETCH_PRODUCT,
  SUBLEVELS_PRODUCT,
  GET_PRODUCTS_BY_SUB_LEVEL,
  SORT_PRODUCTS,
  FILTER_PRODUCTS
} from './../actions/action_types'

const products = require('./../fixtures/products.json')

export const initProducts = () => ({
  type: INIT_PRODUCT,
  payload: API.getProducts()
})

export const fetchProduct = (id) => ({
  type: FETCH_PRODUCT,
  payload: API.getProduct(id)
})

export const getSubLevels = (id) => ({
  type: SUBLEVELS_PRODUCT,
  payload: API.getSubLevels(id)
})

export const getProductsBySubLevel = (id) => {
  return (dispatch) => {
    dispatch({
      type: GET_PRODUCTS_BY_SUB_LEVEL,
      payload: API.groupProductsBySubLevel(products, id)
    })
  }
}

export const sortProducts = (sort) => ({
  type: SORT_PRODUCTS,
  payload: sort
})

export const filterProducts = (filterP) => ({
  type: FILTER_PRODUCTS,
  filters: filterP
})
