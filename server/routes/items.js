import express from 'express';
import { getItems, createItem, updateItem, deleteItem, saveItem } from '../controllers/items.js';

const router = express.Router();

router.get('/', getItems);
router.post('/', createItem);
router.patch('/:id', updateItem);
router.delete('/:id', deleteItem);
router.patch('/:id/saveItem', saveItem);

export default router;
