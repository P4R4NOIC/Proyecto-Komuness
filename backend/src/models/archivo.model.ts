import { IArchivo } from "@/interfaces/archivo.interface";
import { Schema, model } from "mongoose";


//schema archivo
const archivoSchema = new Schema<IArchivo>({
    nombre: { type: String, required: true },
    fechaSubida: { type: String, required: true },
    tipoArchivo: { type: String, required: true },
    tamano: { type: Number, required: true },
    autor: { type: String, required: true },
    esPublico: { type: Boolean, required: true },
    url: { type: String, required: true }, // URL de descarga del archivo en digitalOcean Spaces
    key: { type: String, required: true }, // Nombre del archivo en digitalOcean Spaces
    folder: { type: Schema.Types.ObjectId, ref: 'Folder', default: null },
})

export const Archivo = model<IArchivo>('Archivo', archivoSchema);