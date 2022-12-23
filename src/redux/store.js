import { combineReducers, compose, legacy_createStore } from "redux";
import { workPriceReducer } from "./workPriceReducer";

const ReactReduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ &&  window.__REDUX_DEVTOOLS_EXTENSION__();

function configureStore() {
  return legacy_createStore(
    combineReducers({
      workPrice : workPriceReducer
    }), 
    undefined, 
    compose(ReactReduxDevTools)
  )
}

export default configureStore