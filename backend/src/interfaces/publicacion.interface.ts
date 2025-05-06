import { Document } from "mongoose";

export interface IPublicacion extends Document {
    titulo: string;
    contenido: string;
    autor: string;
    fecha: string;
    adjunto: IAdjunto[];
    comentarios: IComentario[]; // Array de comentarios
    tag: string;
    publicado: boolean;
    fechaEvento?: string;
    Precio?: number;
}

export interface IComentario {
    autor: string;
    contenido: string;
    fecha: string;
}
export interface IAdjunto {
    url: string;
    key: string;
}