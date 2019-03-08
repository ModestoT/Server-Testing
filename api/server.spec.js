const request = require('supertest');

const db = require('../data/dbConfig.js');
const server = require('./server.js');

describe('server.js', () => {
    afterEach(async () => {
        await db('posts').truncate();
    });

    describe('GET /', () => {
        it('Should return a status code of 200 OK', async () => {
            const res = await request(server).get('/');

            expect(res.status).toBe(200);
        });

        it('should return JSON', async () => {
            const res = await request(server).get('/');

            expect(res.type).toMatch(/json/i);
        });

        it('should return { api: "running" }', async () => {
            const res = await request(server).get('/');

            expect(res.body).toEqual({ api: 'running' });
        });
    });

    describe('POST /posts', () => {
        it('should return a status code of 200 OK', async () => {
            const post = {title: 'yo', content: 'Something'};
            const res = await request(server).post('/posts').send(post);

            expect(res.status).toBe(200);
        });

        it('should return a JSON object of the post added', async () => {
            const post = {title: 'yo', content: 'Something'};
            const res = await request(server).post('/posts').send(post);

            expect(res.type).toMatch(/json/i);
            expect(res.body).toMatchObject({title: 'yo', content: 'Something'});
        });
    });

    describe('DELETE /posts', () => {
        it('should return a status code of 204', async () => {
            const post = {title: 'yo', content: 'Something'};
            const res = await request(server).post('/posts').send(post);
            expect(res.type).toMatch(/json/i);
            
            const del = await request(server).del(`/posts/${res.body.id}`);

            expect(del.status).toBe(204);
        });

        it('should return a statu s code of 400 if the id doesn not exist', async () => {
            const post = {title: 'yo', content: 'Something'};
            const res = await request(server).post('/posts').send(post);
            expect(res.type).toMatch(/json/i);
            
            const del = await request(server).del('/posts/2');

            expect(del.status).toBe(400);
        })
    });
});