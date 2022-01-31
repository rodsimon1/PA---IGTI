import mongoose from 'mongoose';
import ItemInfo from '../models/itemInfo.js';

export const getItems = async (req, res) => {
  // res.send('GET items worked!');
  try {
    const itemInfos = await ItemInfo.find();
    // console.log(itemInfos);
    res.status(200).json(itemInfos);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const createItem = async (req, res) => {
  const item = req.body;
  const newItem = new ItemInfo({
    ...item,
    owner: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const updateItem = async (req, res) => {
  const { id: _id } = req.params;
  const item = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("There's no item with that Id");

  const updatedItem = await ItemInfo.findByIdAndUpdate(_id, { ...item, _id }, { new: true });

  res.json(updatedItem);
};

export const deleteItem = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("There's no item with that Id");

  await ItemInfo.findByIdAndDelete(id);
  console.log('DELETE');

  res.json({ message: 'Item successfully deleted' });
};

export const saveItem = async (req, res) => {
  const { id } = req.params;

  // req.userId comes from middleware, so we have access to it here
  if (!req.userId) return res.json({ message: 'Unauthenticated' });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("There's no item with that Id");

  const item = await ItemInfo.findById(id);

  // const index = item.isSaved.findIndex((id) => id === String(req.userId));

  // if (index === -1) {
  //   // save the item - 1:55 on pt 3
  //   item.isSaved.push(req.userId);
  // } else {
  //   // unsave the item
  //   item.isSaved = item.isSaved.filter((id) => id !== String(req.userId));
  // }

  const updatedItem = await ItemInfo.findByIdAndUpdate(
    id,
    { isSaved: !item.isSaved },
    { new: true }
  );
  // console.log(updatedItem.isSaved);

  res.json(updatedItem);
};
