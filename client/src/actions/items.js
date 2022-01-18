import * as api from '../api';
import { CREATE, FETCH_ALL, DELETE, UPDATE, SAVE } from '../constants/actionTypes';

// ACTION CREATORS        Thunk syntax
export const getItems = () => async (dispatch) => {
  try {
    const { data } = await api.fetchItems();
    dispatch({ type: FETCH_ALL, payload: data }); // when using async with thunk, instead of return, use dispatch
  } catch (err) {
    console.log(err);
  }
};

export const createItem = (item) => async (dispatch) => {
  try {
    const { data } = await api.createItem(item);
    dispatch({ type: CREATE, payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const updateItem = (id, item) => async (dispatch) => {
  try {
    const { data } = await api.updateItem(id, item);

    dispatch({ type: UPDATE, payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const deleteItem = (id) => async (dispatch) => {
  try {
    await api.deleteItem(id);

    dispatch({ type: DELETE, payload: id });
  } catch (err) {
    console.log(err);
  }
};

export const saveItem = (id) => async (dispatch) => {
  try {
    const { data } = await api.saveItem(id);

    dispatch({ type: SAVE, payload: data });
  } catch (err) {
    console.log(err);
  }
};
