import {
  GET_SOLD_ITEMS,
  ADD_SOLD_ITEM,
  DELETE_SOLD_ITEM,
  DELETE_ALL_SOLD_ITEMS
} from "../actions/types";

const initialState = {
  items: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SOLD_ITEMS:
      return {
        ...state,
        items: action.payload
      };
    case DELETE_SOLD_ITEM:
      return {
        ...state,
        items: state.items.filter((soldItem) => soldItem._id !== action.payload)
      };
    case ADD_SOLD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items]
      };
    case DELETE_ALL_SOLD_ITEMS:
      return {
        ...state,
        items: []
      };
    default:
      return {
        ...state
      };
  }
}
