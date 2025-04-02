import { IPublicacion } from "@/interfaces/publicacion.interface";
import { model, Schema } from 'mongoose';

//schema comentario
const comentarioSchema = new Schema({
    autor: { type: String, required: true },
    contenido: { type: String, required: true },
    fecha: { type: Date, required: true }
});


//schema publicación
const publicacionSchema = new Schema({
    titulo: { type: String, required: true },
    contenido: { type: String, required: true },
    //id del autor
    autor: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    fecha: { type: Date, required: true },
    adjunto: { type: [String], required: false },
    comentarios: { type: [comentarioSchema], required: false },
    tag: { type: String, required: true },
    publicado: { type: Boolean, required: true }
});

export const modelPublicacion = model<IPublicacion>('Publicacion', publicacionSchema);