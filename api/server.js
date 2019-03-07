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
});

server.delete('/posts/:id', async (req, res) => {
    try {
        const deleted = await Posts.deletePost(req.params.id);

        if(deleted){
            res.status(204).end();
        } else {
            res.status(400).json({ error: 'The posts with that id does not exist'});
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = server;

