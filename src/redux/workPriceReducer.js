import { SET_USER_VALUE_PRICE, SET_USER_VALUE_WORK, SET_NEW_WORK, DELETE_WORK, EDIT_OLD_WORK, SET_USER_FILTER } from "./actions"
import { nanoid } from "nanoid"

const initialState = {
  works: [],
  userWork: '',
  userPrice: '',
  userFilter: ''
}

const workPriceReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_VALUE_PRICE:
      return {
        ...state,
        userPrice: action.payload
      };
    case SET_USER_VALUE_WORK:
      return {
        ...state,
        userWork: action.payload
      };
    case SET_USER_FILTER:
      return {
        ...state,
        userFilter: action.payload
      };
    case SET_NEW_WORK:
      state.works.push({
        work: state.userWork,
        price: state.userPrice,
        id: nanoid()
      })
      return {
        ...state
      }
    case EDIT_OLD_WORK:
      const newWorks = state.works.map(item => {
        if (item.id === action.id) {
          item.work = state.userWork;
          item.price = state.userPrice;
        }
        return item
      })
      return { ...state, works: newWorks }
    case DELETE_WORK:
      const index = state.works.findIndex(item => item.id === action.payload)
      state.works.splice(index, 1)
      return { ...state }
    default:
      return state
  }
}

export { workPriceReducer }