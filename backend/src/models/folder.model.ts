import { Schema, model } from "mongoose";
import { IFolder } from "@/interfaces/folder.interface";

const folderSchema = new Schema<IFolder>({
    nombre: { type: String, required: true },
    fechaCreacion: { type: String, required: true },
    directorioPadre: { type: Schema.Types.ObjectId, ref: 'Folder', default: null },
})

export const Folder = model<IFolder>('Folder', folderSchema);