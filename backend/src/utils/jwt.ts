import jwt from 'jsonwebtoken';
import { IUsuario } from '../interfaces/usuario.interface';
import dotenv from 'dotenv';
dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET || 'secret';

//generamos un token con el objeto usuario
export const generarToken = (usuario: IUsuario): string => {
    const token = jwt.sign({ usuario }, JWT_SECRET, { expiresIn: '1d' });
    return token;
}

/**
 * verificar token
 * @param token
 * @returns user | null
 */
export const verificarToken = async (token: string): Promise<IUsuario | null> => {
    try {
        const decoded = await jwt.verify(token, JWT_SECRET) as { usuario: IUsuario };
        return decoded.usuario;
    } catch (error) {
        console.error('Error verifying token:', error);
        return null;
    }
};