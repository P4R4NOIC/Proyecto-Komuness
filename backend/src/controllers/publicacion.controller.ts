import { Request, Response } from 'express';
import { IComentario, IPublicacion } from '../interfaces/publicacion.interface';
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
        /**
         * Query params:
         */
        //Paginación
        const offset = parseInt(req.query.offset as string) || 0;
        const limit = parseInt(req.query.limit as string) || 10;

        const publicaciones: IPublicacion[] = await modelPublicacion.find();
        res.status(200).json(publicaciones);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
};

//obtener publicaciones por tag
export const getPublicacionesByTag = async (req: Request, res: Response): Promise<void> => {
    try {

        //paginación
        const offset = parseInt(req.query.offset as string) || 0;
        const limit = parseInt(req.query.limit as string) || 10;
        
        const { tag } = req.query;
        console.log("Tag recibido:", tag); 
        const publicaciones: IPublicacion[] = await modelPublicacion.find({ tag: tag })
                                                                    .skip(offset)
                                                                    .limit(limit);
        if (publicaciones.length === 0) {
            res.status(404).json({ message: 'No se encontraron publicaciones con ese tag' });
            return;
        }
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
        const publicacion: IPublicacion | null = await modelPublicacion.findById(id);
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
        const updatedData: Partial<IPublicacion> = req.body;
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

/**
 * Agrega comentarios a una publicación
 * @param req : Request de la petición
 * @param res : Response de la petición
 * @returns Código de estado de la petición
 */
export const addComentario = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; //identificador de la publicación
    const { autor, contenido } = req.body; //autor y contenido del comentario
    //creado el comentario
    const nuevoComentario: IComentario = {
        autor,
        contenido,
        fecha: new Date().toLocaleDateString()
    }

    try {
        const publicacionActualizada = await modelPublicacion.findByIdAndUpdate(
            id,
            { $push: { comentarios: nuevoComentario } },
            { new: true }); //agrega el comentario a la publicación

        if (!publicacionActualizada) {
            res.status(404).json({ message: 'Publicación no encontrada' });
            return;
        }
        res.status(201).json(publicacionActualizada);

    } catch (error) {
        console.log('Error al agregar comentario:', error);
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
}
