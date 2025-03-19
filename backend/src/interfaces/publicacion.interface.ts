import { Document } from "mongoose";

export interface Publicacion extends Document {
    titulo: string;
    contenido: string;
    autor: string;
    fecha: Date;
    adjunto: string[];
}