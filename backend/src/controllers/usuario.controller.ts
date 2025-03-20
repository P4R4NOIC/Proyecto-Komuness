import { Request, Response } from 'express';
import { IUsuario as Usuario } from '../interfaces/usuario.interface';
import { modelUsuario } from '../models/usuario.model';

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
