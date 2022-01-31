import * as api from '../api';
import { CREATE, FETCH_ALL, DELETE, UPDATE, SAVE } from '../constants/actionTypes';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    toast.success(`Item ${data.name} created successfully`);
  } catch (err) {
    console.log(err);
  }
};

export const updateItem = (id, item) => async (dispatch) => {
  try {
    const { data } = await api.updateItem(id, item);

    dispatch({ type: UPDATE, payload: data });
    toast.info(`Item ${data.name} updated successfully`);
  } catch (err) {
    console.log(err);
  }
};

export const deleteItem = (id) => async (dispatch) => {
  try {
    await api.deleteItem(id);

    dispatch({ type: DELETE, payload: id });
    toast.warn(`Item removed successfully`);
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
