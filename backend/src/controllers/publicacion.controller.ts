import { Request, Response } from 'express';
import { IPublicacion } from '../interfaces/publicacion.interface';
import { modelPublicacion } from '../models/publicacion.model';

// Crear una publicación
export const createPublicacion = async (req: Request, res: Response): Promise<void> => {
    try {
        const publicacion: IPublicacion = req.body;
        const nuevaPublicacion = new modelPublicacion(publicacion);
        const savePost = await nuevaPublicacion.save();
        res.status(201).json(savePost);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
};

// Obtener todas las publicaciones
export const getPublicaciones = async (req: Request, res: Response): Promise<void> => {
    try {
        const publicaciones = await modelPublicacion.find();
        res.status(200).json(publicaciones);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
};

// Obtener una publicación por su ID
export const getPublicacionById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const publicacion = await modelPublicacion.findById(id);
        if (!publicacion) {
            res.status(404).json({ message: 'Publicación no encontrada' });
            return;
        }
        res.status(200).json(publicacion);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
};

// Actualizar una publicación
export const updatePublicacion = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const publicacion = await modelPublicacion.findByIdAndUpdate(id, updatedData, { new: true });
        if (!publicacion) {
            res.status(404).json({ message: 'Publicación no encontrada' });
            return;
        }
        res.status(200).json(publicacion);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
};

// Eliminar una publicación
export const deletePublicacion = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const deletedPost = await modelPublicacion.findByIdAndDelete(id);
        if (!deletedPost) {
            res.status(404).json({ message: 'Publicación no encontrada' });
            return;
        }
        res.status(200).json({ message: 'Publicación eliminada correctamente' });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
};
