import Post from '../models/post_model';

export const createPost = (req, res) => {
  const post = new Post();
  post.setState({
    title: req.body.title,
    tags: req.body.tags,
    contents: req.body.contents,
    coverURL: req.body.coverURL,
  });

  post.save()
    .then((result) => {
      res.json({ message: 'Post created!' });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
export const getPosts = (req, res) => {
  res.send('posts should be returned');
};
export const getPost = (req, res) => {
  res.send('single post looked up');
};
export const deletePost = (req, res) => {
  res.send('delete a post here');
};
export const updatePost = (req, res) => {
  res.send('update a post here');
};
