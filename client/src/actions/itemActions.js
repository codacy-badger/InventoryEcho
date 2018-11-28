import axios from "axios";
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING, SEARCH_ITEMS } from "./types";

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};

export const sendQuery = (newQuery) => (dispatch) => {
  axios
    .get("/api/items/search/", { params: newQuery })
    .then(res => {
      dispatch({
        type: SEARCH_ITEMS,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const getItems = () => (dispatch) => {
  dispatch(setItemsLoading());
  axios.get("/api/items").then((res) =>
    dispatch({
      type: GET_ITEMS,
      payload: res.data
    })
  );
};

export const deleteItem = (id) => (dispatch) => {
  axios.delete(`/api/items/${id}`).then((res) =>
    dispatch({
      type: DELETE_ITEM,
      payload: id
    })
  );
};

export const addItem = (item) => (dispatch) => {
  //send post request to add item
  axios.post("/api/items", item).then((res) =>
    dispatch({
      type: ADD_ITEM,
      payload: res.data
    })
  );
};

export const editItem = (item) => (dispatch) => {
  // send post request to add item
  axios.post("/api/items", item).then((res) =>
    dispatch({
      type: ADD_ITEM,
      payload: res.data
    })
  );
};
