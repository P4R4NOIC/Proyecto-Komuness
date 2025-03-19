import { Document } from "mongoose";

export interface Usuario extends Document {
    nombre: string;
    apellido: string;
    email: string;
    password: string;
}
