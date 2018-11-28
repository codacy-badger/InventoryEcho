import axios from "axios";
import { GET_SOLD_ITEMS, DELETE_ALL_SOLD_ITEMS, ADD_SOLD_ITEM, DELETE_SOLD_ITEM } from "./types";

export const getSoldItems = () => (dispatch) => {
  axios.get("/api/sales").then((res) =>
    dispatch({
      type: GET_SOLD_ITEMS,
      payload: res.data
    })
  );
};

export const deleteSoldItem = (id) => (dispatch) => {
  axios.delete(`/api/sales/${id}`).then((res) =>
    dispatch({
      type: DELETE_SOLD_ITEM,
      payload: id
    })
  );
};

export const deleteAllItems = () => (dispatch) => {
  axios.delete(`/api/sales/`).then((res) =>
    dispatch({
      type: DELETE_ALL_SOLD_ITEMS
    })
  );
};

export const addSoldItem = (item) => (dispatch) => {
  //send post request to add item
  axios.post("/api/sales", item).then((res) =>
    dispatch({
      type: ADD_SOLD_ITEM,
      payload: res.data
    })
  );
};
