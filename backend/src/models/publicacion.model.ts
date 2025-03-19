import { Publicacion } from "../interfaces/publicacion.interface";
import { model, Schema } from 'mongoose';

const publicacionSchema = new Schema({
    titulo: { type: String, required: true },
    contenido: { type: String, required: true },
    //id del autor
    autor: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    fecha: { type: Date, required: true },
    adjunto: { type: [String], required: false }
});

export const modelPublicacion = model<Publicacion>('Publicacion', publicacionSchema);