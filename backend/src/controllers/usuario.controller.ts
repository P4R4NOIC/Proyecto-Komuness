import { Request, Response } from 'express';
import { IUsuario, IUsuario as Usuario } from '../interfaces/usuario.interface';
import { modelUsuario } from '../models/usuario.model';
import { generarToken, verificarToken } from '../utils/jwt';
import { hashPassword, comparePassword } from '../utils/bcryptjs';

// Controlador para crear un usuario
export const createUsuario = async (req: Request, res: Response): Promise<void> => {
    try {
        const usuario: Usuario = req.body;
        const user = new modelUsuario(usuario);
        const saveuser = await user.save();
        res.status(201).json(saveuser);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
};

// Controlador para obtener todos los usuarios
export const getUsuarios = async (req: Request, res: Response): Promise<void> => {
    try {
        const usuarios = await modelUsuario.find();
        res.status(200).json(usuarios);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
};

// Controlador para obtener un usuario por su id
export const getUsuarioById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const usuario = await modelUsuario.findById(id);
        res.status(200).json(usuario);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
};

// Controlador para actualizar un usuario
export const updateUsuario = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const usuario: Usuario = req.body;
        const user = await modelUsuario.findByIdAndUpdate(id, usuario, { new: true });
        res.status(200).json(user);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
};

// Controlador para eliminar un usuario
export const deleteUsuario = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        await modelUsuario.findByIdAndDelete(id);
        res.status(200).json({ message: 'Usuario eliminado' });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
};

/**
 * 
 * loginUsuario: realiza el login de un usuario y devuelve un token
 * @param req: Request
 * @param res: Response
 * @returns: void
 */
export const loginUsuario = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        //buscamos el usuario en la base de datos
        const usuario = await modelUsuario.findOne({ email });
        if (!usuario) {
            res.status(401).json({ message: 'Usuario no encontrado' });
            return;
        }
        //comparamos la contraseña
        const isPasswordValid = await comparePassword(password, usuario.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Contraseña incorrecta' });
            return;
        }
        //si es exitoso, generamos un token y lo devolvemos en la cookie
        const token = generarToken(usuario);
        res.cookie('token',
            token,
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
            }
        );
        res.status(200).json({ message: 'Login exitoso', user: usuario });
    } catch (error) {
        const err = error as Error;
        console.log(err);
        res.status(500).json({ message: err.message });
    }
}

/**
 * 
 * registerUsuario: registra un usuario en la base de datos
 * @param req: Request
 * @param res: Response
 * @returns: void
 */
export const registerUsuario = async (req: Request, res: Response): Promise<void> => {
    const { nombre, apellido, email, password, tipoUsuario, codigo } = req.body;
    try {
        //verificamos si el usuario ya existe
        const usuario = await modelUsuario.findOne({ email });
        if (usuario) {
            res.status(400).json({ message: 'Usuario ya existe' });
            return;
        }
        //si no existe, lo creamos
        const hashedPassword = await hashPassword(password);
        const newUsuario = new modelUsuario({
            nombre,
            apellido,
            email,
            password: hashedPassword,
            tipoUsuario,
            codigo
        });
        await newUsuario.save();
        res.status(201).json({ message: 'Usuario creado', user: newUsuario });
    } catch (error) {
        const err = error as Error;
        console.log(err);
        res.status(500).json({ message: err.message });
    }
}

/**
 * checkAuth: verifica si el usuario esta autenticado en la aplicacion
 * @param req: Request
 * @param res: Response
 * @returns: void
 */
export const checkAuth = async (req: Request, res: Response): Promise<void> => {
    try {
        const { token } = req.cookies;
        if (!token) {
            res.status(401).json({ message: 'Token no proporcionado' });
            return;
        }
        //verificamos el token
        const usuario: unknown = await verificarToken(token);
        if (!usuario) {
            res.status(401).json({ message: 'No autorizado' });
            return;
        }
        res.status(200).json({ message: 'Autorizado', user: usuario });
    } catch (error) {
        const err = error as Error;
        console.log(err);
        res.status(500).json({ message: err.message });
    }
}