const db = require('../data/dbConfig.js');

module.exports = {
    addPost
};

async function addPost(post) {
    const [id] = await db('posts').insert(post, 'id');

    return db('posts').where({ id }).first();
}