import { Request, Response } from 'express';
import { IAdjunto, IComentario, IPublicacion } from '../interfaces/publicacion.interface';
import { modelPublicacion } from '../models/publicacion.model';
import mongoose from 'mongoose';
import { uploadFile } from '../utils/digitalOceanSpace';

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

//Crear publicación con adjunto v2
export const createPublicacionA = async (req: Request, res: Response): Promise<void> => {
    try {
        const publicacion: IPublicacion = req.body;
        if (!req.files) {
            res.status(400).json({ message: 'No se ha proporcionado un archivo' });
            return;
        }
        //subimos la imagen o imagenes
        let datos: IAdjunto[] = [];

        for (let image of req.files as Express.Multer.File[]) {
            const result = await uploadFile(image, 'publicaciones');
            if (!result) {
                res.status(500).json({ message: 'Error al subir el archivo' });
                return;
            }
            datos.push({
                url: result.location,
                key: result.key
            })
        }
        const nuevaPublicacion = new modelPublicacion({
            ...publicacion,
            adjunto: datos
        });
        const savePost = await nuevaPublicacion.save();
        res.status(201).json(savePost);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
}


//obtener publicaciones por tag
export const getPublicacionesByTag = async (req: Request, res: Response): Promise<void> => {
    try {
        const offset = parseInt(req.query.offset as string) || 0;
        const limit = parseInt(req.query.limit as string) || 10;
        const { tag, publicado } = req.query;

        // Construye el query de manera flexible
        const query: { tag?: string; publicado?: boolean } = {};
        
        if (tag) {
            query.tag = tag as string;
        }
        
        if (publicado !== undefined) {
            query.publicado = publicado === 'true';
        }

        const [publicaciones, totalPublicaciones] = await Promise.all([
            modelPublicacion.find(query)
                .populate('autor', 'nombre')
                .sort({ createdAt: -1 })
                .skip(offset)
                .limit(limit),
            modelPublicacion.countDocuments(query)
        ]);

        if (publicaciones.length === 0) {
            res.status(404).json({ message: 'No se encontraron publicaciones' });
            return;
        }

        res.status(200).json({
            data: publicaciones,
            pagination: {
                offset,
                limit,
                total: totalPublicaciones,
                pages: Math.ceil(totalPublicaciones / limit),
            },
        });
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
        fecha: "",
        // fecha: new Date().toLocaleDateString()
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


// filtros de busqueda
// Obtener publicaciones por titulo, autor o tag (barra de búsqueda)
export const filterPublicaciones = async (req: Request, res: Response): Promise<void> => {
    try {
        const { texto, tag, autor } = req.query;

        const filtro: any = {};

        //filtro por texto (titulo o contenido)
        if (texto) {
            filtro.$or = [
                { titulo: { $regex: texto, $options: 'i' } },
                { contenido: { $regex: texto, $options: 'i' } }
            ];
        }
        //filtro por tag
        if (tag) filtro.tag = { $regex: tag, $options: 'i' };
        //filtro por autor
        if (autor) {
            if (!mongoose.Types.ObjectId.isValid(autor as string)) {
                res.status(400).json({ message: 'ID de autor inválido' });
                return;
            }
            filtro.autor = autor; // o: new mongoose.Types.ObjectId(autor as string)
        }

        if (Object.keys(filtro).length === 0) {
            res.status(400).json({ message: 'Debe proporcionar al menos un parámetro de búsqueda (titulo, tag o autor)' });
            return;
        }

        const publicaciones: IPublicacion[] = await modelPublicacion.find(filtro);

        if (publicaciones.length === 0) {
            res.status(404).json({ message: 'No se encontraron publicaciones con esos criterios' });
            return;
        }

        res.status(200).json(publicaciones);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
};
