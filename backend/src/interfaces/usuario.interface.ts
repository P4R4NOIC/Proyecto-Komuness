import { Document } from "mongoose";

export interface IUsuario extends Document {
    nombre: string;
    apellido: string;
    email: string;
    password: string;
}
