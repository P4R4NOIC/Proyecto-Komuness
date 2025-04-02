import { describe, expect, test } from '@jest/globals';
import request from 'supertest';
import app from '../index';
import mongoose from 'mongoose';
import { connectBD } from '../utils/mongodb';

describe('Publicacion Endpoints', () => {
    beforeAll(async () => {
        await connectBD(process.env.BD_URL || 'mongodb://localhost:27017/testdb'); // Conectar a la BD
    });


    const testPublicacion = {
        titulo: 'Test Publicacion',
        contenido: 'This is a test publication content',
        fecha: new Date(),
        autor: new mongoose.Types.ObjectId('67da43f3651480413241b33c'),
        tag: 'test',
        adjunto: [],
        comentarios: [],
        publicado: false,
    };

    test('POST /publicaciones - Create new publication', async () => {
        const response = await request(app)
            .post('/publicaciones')
            .send(testPublicacion);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        const responseDelete = await request(app)
            .delete(`/publicaciones/${response.body._id}`);
        expect(responseDelete.status).toBe(200);
    });

    test('GET /publicaciones - Get all publications', async () => {
        const response = await request(app)
            .get('/publicaciones');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
    });

    test('GET /publicaciones/:id - Get publication by ID', async () => {
        // First create a publication
        const createResponse = await request(app)
            .post('/publicaciones')
            .send(testPublicacion);

        const publicacionId = createResponse.body._id;

        const response = await request(app)
            .get(`/publicaciones/${publicacionId}`);

        expect(response.status).toBe(200);
        expect(response.body.titulo).toBe(testPublicacion.titulo);
        const responseDelete = await request(app)
            .delete(`/publicaciones/${publicacionId}`);
        expect(responseDelete.status).toBe(200);
    });

    test('PUT /publicaciones/:id - Update publication', async () => {
        // First create a publication
        const createResponse = await request(app)
            .post('/publicaciones')
            .send(testPublicacion);

        const publicacionId = createResponse.body._id;
        const updatedData = { ...testPublicacion, titulo: 'Updated Title' };

        const response = await request(app)
            .put(`/publicaciones/${publicacionId}`)
            .send(updatedData);

        expect(response.status).toBe(200);
        expect(response.body.titulo).toBe('Updated Title');
        const responseDelete = await request(app)
            .delete(`/publicaciones/${publicacionId}`);
        expect(responseDelete.status).toBe(200);
    });

    test('DELETE /publicaciones/:id - Delete publication', async () => {
        // First create a publication
        const createResponse = await request(app)
            .post('/publicaciones')
            .send(testPublicacion);

        const publicacionId = createResponse.body._id;

        const response = await request(app)
            .delete(`/publicaciones/${publicacionId}`);

        expect(response.status).toBe(200);

        // Verify the publication was deleted
        const getResponse = await request(app)
            .get(`/publicaciones/${publicacionId}`);
        expect(getResponse.status).toBe(404);
    });
});
