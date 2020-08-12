import mongoose, { Schema } from 'mongoose';

// create a PostSchema with a title field
const PostSchema = new Schema({
  title: String,
  tags: String,
  coverUrl: String,
  content: String,
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

// create PostModel class from schema
const Post = mongoose.model('Poll', PostSchema);

export default Post;
