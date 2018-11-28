import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import saleReducer from "./saleReducer";

export default combineReducers({
  item: itemReducer,
  soldItem: saleReducer
  //auth: authReducer
});
