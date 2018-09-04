import {
  ADD_TO_CART,
  UPDATE_QUANTITY,
  REMOVE_PRODUCT,
  RESET_CART
} from './../actions/action_types' 


export const cart = (state = {} , action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        [action.payload.id]: {
          ...action.payload,
          quantityInCart: state[action.payload.id] ? state[action.payload.id].quantityInCart + 1 : 1,
        }
      } 
    case UPDATE_QUANTITY:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          quantityInCart: action.payload.quantity
        }
      } 
    case REMOVE_PRODUCT: {
      const { [action.payload]: toDelete, ...rest } = state 
      return rest 
    }
    case RESET_CART:
      return {

      } 
    default:
      return state 
  }
} 
