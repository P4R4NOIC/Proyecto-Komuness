import { Document } from "mongoose";

interface Folder {
    nombre: string;
    fechaCreacion: string;
    directorioPadre: string;
}

export interface IFolder extends Document, Omit<Folder, 'directorioPadre'> {
    directorioPadre: string | { _id: string };
}