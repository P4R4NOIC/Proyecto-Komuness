import { IUsuario } from "@/interfaces/usuario.interface";
import { model, Schema } from 'mongoose';

const usuarioSchema = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    tipoUsuario: { type: Number, required: true },
    codigo: { type: String, required: true },
});

export const modelUsuario = model<IUsuario>('Usuario', usuarioSchema);