import axios from 'axios';

// const url = 'http://localhost:5000/items';
const url = 'https://projeto-aplicado-igti.herokuapp.com/items';

// const BASE_URL =
//   process.env.NODE_ENV === 'development'
//     ? 'http://localhost:5000/items'
//     : 'https://projeto-aplicado-igti.herokuapp.com/items';

export const fetchItems = () => axios.get(url);
export const createItem = (newItem) => axios.post(url, newItem);
export const updateItem = (id, updatedItem) => axios.patch(`${url}/${id}`, updatedItem);
export const deleteItem = (id) => axios.delete(`${url}/${id}`);
export const saveItem = (id) => axios.patch(`${url}/${id}/saveItem`);
