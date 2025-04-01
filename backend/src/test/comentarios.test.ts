
import request from "supertest";
import app from "../index"; // Asegúrate de importar la instancia de Express
import { modelPublicacion } from "../models/publicacion.model";
import mongoose from "mongoose";

describe("Comentarios en Publicaciones", () => {
    let publicacionId: string | null = null;

    beforeAll(async () => {
        // Crear una publicación de prueba antes de ejecutar las pruebas
        const publicacion = await modelPublicacion.create({
            titulo: "Prueba",
            contenido: "Contenido de prueba",
            autor: new mongoose.Types.ObjectId('67da43f3651480413241b33c'),
            fecha: new Date(),
            adjunto: [],
            comentarios: [],
            tag: "test",
            publicado: true
        });

        publicacionId = (publicacion as any)._id.toString();
    });

    // afterAll(async () => {
    //     await mongoose.connection.close();
    // });

    test("Debe agregar un comentario a la publicación", async () => {
        const comentario = {
            autor: "Usuario de prueba",
            contenido: "Este es un comentario de prueba"
        };

        const response = await request(app)
            .post(`/publicaciones/${publicacionId}/comentarios`)
            .send(comentario)
            .expect(201);

        expect(response.body.comentarios).toHaveLength(1);
        expect(response.body.comentarios[0].autor).toBe(comentario.autor);
        expect(response.body.comentarios[0].contenido).toBe(comentario.contenido);
    });
});