const db = require('../data/dbConfig.js');

module.exports = {
    addPost,
    deletePost
};

async function addPost(post) {
    const [id] = await db('posts').insert(post, 'id');

    return db('posts').where({ id }).first();
};

function deletePost(id) {
    return db('posts')
        .where({ id })
        .del();
}