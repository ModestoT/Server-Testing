const express = require('express');

const Posts = require('../posts/posts-model.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' });
});

server.post('/posts', async (req, res) => {
    const post = await Posts.addPost(req.body);

    res.status(200).json(post);
})
module.exports = server;

