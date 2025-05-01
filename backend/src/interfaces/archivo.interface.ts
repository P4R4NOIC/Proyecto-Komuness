import { Document } from 'mongoose';

interface Archivo {
    nombre: string;
    fechaSubida: string;
    tipoArchivo: string;
    tamano: number;
    autor: string;
    esPublico: boolean;
    url: string; // URL de descarga del archivo en digitalOcean Spaces
    key: string; // Key en digitalOcean Spaces para su eliminacion
    folder: string;
}
export interface IArchivo extends Document, Omit<Archivo, 'folder'> {
    folder: string | { _id: string };
};