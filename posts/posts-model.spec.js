const db = require('../data/dbConfig.js');
const Posts = require('./posts-model.js');

describe('Posts Model', () => {
    describe('addPost()', () => {
        afterEach(async () => {
            await db('posts').truncate();
        });

        it('should add a provided post to the Database and return the posts added', async () => {
            const post = await Posts.addPost({
                title: 'This is a test',
                content: 'Well would you look at that'
            });

            expect(post).toBe({
                title: 'This is a test',
                content: 'Well would you look at that'
            });

            expect(post).toHaveLength(1);
        });
    });
});