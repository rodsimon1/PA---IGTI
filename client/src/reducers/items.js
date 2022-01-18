import { CREATE, FETCH_ALL, DELETE, UPDATE, SAVE } from '../constants/actionTypes';

const reducer = (items = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload; // payload is the actual item
    case CREATE:
      return [...items, action.payload];
    case UPDATE: // when both cases have same return, can be one above the other
    case SAVE:
      return items.map((item) => (item._id === action.payload._id ? action.payload : item));
    case DELETE:
      return items.filter((item) => item._id !== action.payload._id);

    default:
      return items;
  }
};

export default reducer;
