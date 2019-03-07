const request = require('supertest');

const server = require('./server.js');

describe('server.js', () => {
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
});