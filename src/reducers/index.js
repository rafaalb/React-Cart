// Set up your root reducer here...
 import { combineReducers } from 'redux' 

 import {
   cart
 } from './cart_reducer' 

import {
  products,
  activeProduct,
  sublevels
} from './products_reducer' 

 export default combineReducers({
  cart,
  products,
  activeProduct,
  sublevels
 }) 
