import mongoose from 'mongoose';

const itemSchema = mongoose.Schema({
  //
  name: String,
  description: String,
  owner: String,
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

const ItemMessage = mongoose.model('ItemMessage', itemSchema);

export default ItemMessage;
