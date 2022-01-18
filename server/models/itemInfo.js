import mongoose from 'mongoose';

const itemSchema = mongoose.Schema({
  name: String,
  description: String,
  owner: String,
  phoneNumber: String,
  tags: [String],
  selectedFile: String, // to convert image to String
  isSaved: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const ItemInfo = mongoose.model('ItemInfo', itemSchema);

export default ItemInfo;
