import { Document } from "mongoose";

export interface IPublicacion extends Document {
    titulo: string;
    contenido: string;
    autor: string;
    fecha: Date;
    adjunto: string[];
    comentarios: IComentario[]; // Array de comentarios
    tag: string;
    publicado: boolean;
    fechaEvento?: Date;
    Precio?: number;
}

export interface IComentario {
    autor: string;
    contenido: string;
    fecha: Date;
}