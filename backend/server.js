const express = require('express');
require('dotenv').config(); // Load .env variables
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Serve static files (HTML, CSS, JS) from the 'public' folder
app.use(express.static('public'));

// In-memory store (you can later replace this with a database)
let posts = [
  { id: 1, title: "First Post", content: "This is my first post!" },
];

// GET: Retrieve all blog posts
app.get('/posts', (req, res) => {
  res.status(200).json(posts);
});

// POST: Create a new blog post
app.post('/posts', (req, res) => {
  const { title, content } = req.body;
  const newPost = { id: posts.length + 1, title, content };
  posts.push(newPost);
  res.status(201).json(newPost);
});

// PUT: Update a specific post by ID
app.put('/posts/:id', (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  let post = posts.find(p => p.id === parseInt(id));
  if (!post) return res.status(404).send("Post not found");

  post.title = title;
  post.content = content;

  res.status(200).json(post);
});

// DELETE: Delete a post by ID
app.delete('/posts/:id', (req, res) => {
  const { id } = req.params;

  const postIndex = posts.findIndex(p => p.id === parseInt(id));
  if (postIndex === -1) return res.status(404).send("Post not found");

  posts.splice(postIndex, 1);
  res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
