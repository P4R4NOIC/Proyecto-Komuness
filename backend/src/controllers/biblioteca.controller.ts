import { Request, Response } from 'express';
import { Archivo } from '../models/archivo.model';
import { Folder } from '../models/folder.model';
import { uploadFile } from '../utils/digitalOceanSpace';
import { IArchivo } from '../interfaces/archivo.interface';
import mongoose from 'mongoose';

class BibliotecaController {
    /**
     * @description: Sube los archivos a la biblioteca en digitalOcean spaces y guarda los metadatos en la base de datos
     * @route: POST /api/biblioteca/uploadFiles
     * @param req: Request
     * @param res: Response
     * @returns: Response 
     */
    static async uploadFiles(req: Request, res: Response) {

        const { folderId, userId } = req.body;
        console.log(folderId, userId);
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'userId es requerido',
                errors: []
            });
        }

        const files = req.files as Express.Multer.File[];

        if (!files || files.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No se han enviado archivos.',
                errors: []
            });
        }

        try {

            const results = await Promise.all(files.map(async (file) => {

                try {
                    //subir archivo a digitalOcean spaces
                    const result: { location: string, key: string } | null = await uploadFile(file, folderId);
                    if (!result) {
                        return {
                            success: false,
                            nombre: file.originalname,
                            message: 'Error al subir el archivo',
                            content: null
                        };
                    }

                    //guardar los metadatos del archivo en la base de datos
                    const archivo = new Archivo({
                        nombre: file.originalname,
                        fechaSubida: new Date(),
                        tipoArchivo: file.mimetype,
                        tamano: file.size,
                        autor: userId,
                        esPublico: false,
                        url: result.location, // Asignar la URL devuelta
                        key: result.key, // Asignar la key devuelta
                        folder: folderId
                    });
                    //guardar archivo en la base de datos
                    await archivo.save();
                    //guardando el estado de la subida en digitalOcean spaces y en la base de datos
                    return {
                        success: true,
                        nombre: file.originalname,
                        message: 'Archivo subido correctamente',
                        content: archivo
                    };
                } catch (error) {
                    console.error('Error detallado:', error); // Mejor logging
                    return {
                        success: false,
                        nombre: file.originalname,
                        message: error instanceof Error ? error.message : 'Error interno al procesar el archivo',
                        content: null
                    };
                }
            }));
            // Verificar si hay errores en alguna de las respuestas
            const hasErrors = results.some(r => !r.success);
            // Respuesta final al cliente
            return res.status(hasErrors ? 207 : 200).json({
                success: !hasErrors,
                message: hasErrors ? 'Algunos archivos no se subieron correctamente' : 'Todos los archivos subidos exitosamente',
                results
            });

        } catch (error) {
            console.error('Error general:', error);
            return res.status(500).json({
                success: false,
                message: 'Error interno del servidor',
                error: error instanceof Error ? error.message : 'An unknown error occurred'
            });
        }
    }

    /**
     * @description: Lista el contenido de una carpeta de la biblioteca (archivos y carpetas) 
     * @route: GET /api/biblioteca/list/:id
     * si su id es 0, entonces se listan los archivos y carpetas de la raiz
     * de lo contrario, se listan los archivos y carpetas de la carpeta con el id especificado
     * @param req: Request
     * @param res: Response
     * @returns: Response
     */
    static async list(req: Request, res: Response) {
        const { id } = req.params;
        const { nombre, global, publico } = req.query;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'id es requerido',
                errors: []
            });
        }
        
        const queryArchivos = {
            ...(global !== 'true' && { folder: id !== '0' ? id : null }),
            ...(nombre && { nombre: { $regex: nombre, $options: 'i' } }),
            ...(publico !== undefined && { esPublico: publico === 'true' })
        };
    
        const queryFolders = {
            ...(global !== 'true' && { directorioPadre: id !== '0' ? id : null }),
            ...(nombre && { nombre: { $regex: nombre, $options: 'i' } })
        };

        try {
            const archivos = await Archivo.find(queryArchivos);
            const folders = await Folder.find(queryFolders);

            return res.status(200).json({
                success: true,
                contentFile: archivos,
                contentFolder: folders
            });
        } catch (error) {
            console.error('Error general:', error);
            return res.status(500).json({
                success: false,
                message: 'Error interno del servidor',
                error: error instanceof Error ? error.message : 'An unknown error occurred'
            });
        }
    }

    /**
     * @description: Crea una carpeta en la biblioteca
     * @route: POST /api/biblioteca/folder
     * @param req: Request
     * @param res: Response
     * @returns: Response
     */
    static async createFolder(req: Request, res: Response) {
        const { nombre, parent } = req.body;

        if (!nombre) {
            return res.status(400).json({
                success: false,
                message: 'nombre es requerido',
                errors: []
            });
        }

        try {
            const folder = new Folder({
                nombre,
                fechaCreacion: new Date(),
                parent
            });
            await folder.save();

            return res.status(200).json({
                success: true,
                message: 'Carpeta creada correctamente',
                content: folder
            })
        } catch (error) {
            console.error('Error general:', error);
            return res.status(500).json({
                success: false,
                message: 'Error interno del servidor',
                error: error instanceof Error ? error.message : 'An unknown error occurred'
            });
        }
    }
    /**
     * Función para eliminar un archivo de la biblioteca (modular, debido a que hay 2 funciones que la llaman)
     * @param id
     * @returns boolean
     */
    static async deleteFileById(id: string) {
        try {
            const archivo = await Archivo.findById(id);

            if (!archivo)
                return false;
            // Eliminar el archivo de la biblioteca
            await Archivo.findByIdAndDelete(id);

            return true;
        } catch (error) {
            console.error(`Error en la función: ${this.constructor.name}\n Error general:${error}`);
            return false;
        }
    }

    /**
     * @description: Elimina un archivo de la biblioteca
     * @route: DELETE /api/biblioteca/deleteFile/:id
     * @param req: Request
     * @param res: Response
     * @returns: Response
     */
    static async deleteFile(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'id es requerido',
                errors: []
            });
        }

        try {
            const archivo = await Archivo.findById(id);

            if (!archivo) {
                return res.status(404).json({
                    success: false,
                    message: 'Archivo no encontrado',
                    errors: []
                })
            }
            // Eliminar el archivo de la biblioteca
            await BibliotecaController.deleteFileById(id);
            return res.status(200).json({
                success: true,
                message: 'Archivo eliminado correctamente',
                content: archivo
            });
        } catch (error) {
            console.error('Error general:', error);
            return res.status(500).json({
                success: false,
                message: 'Error interno del servidor',
                error: error instanceof Error ? error.message : 'An unknown error occurred'
            });
        }
    }

    /**
     * @description: Elimina una carpeta de la biblioteca
     * @route: DELETE /api/biblioteca/deleteFolder/:id
     * @param req: Request
     * @param res: Response
     * @returns: Response
     */
    static async deleteFolder(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'id es requerido',
                errors: []
            });
        }

        try {
            const folder = await Folder.findById(id);
            const archivos: IArchivo[] = await Archivo.find({ folder: id });

            if (!folder) {
                return res.status(404).json({
                    success: false,
                    message: 'Carpeta no encontrada',
                    errors: []
                })
            }
            // Eliminar la carpeta de la biblioteca
            await Folder.findByIdAndDelete(id);
            //luego, eliminar todos los archivos que esten dentro de la carpeta
            for (const archivo of archivos) {
                await BibliotecaController.deleteFileById(archivo._id?.toString() || '');
            }
            return res.status(200).json({
                success: true,
                message: 'Carpeta y archivos eliminados correctamente',
                content: folder
            })

        } catch (error) {
            console.error('Error general:', error);
            return res.status(500).json({
                success: false,
                message: 'Error interno del servidor',
                error: error instanceof Error ? error.message : 'An unknown error occurred'
            });
        }
    }

    /**
     * @description: Busca un archivo de la biblioteca
     * @route: GET /biblioteca/search?params=values
     *   @param texto: Texto a buscar en el nombre del archivo o tipoArchivo (o folder)
     *   @param tipoArchivo: Tipo de archivo a buscar
     *   @param autor: ID del autor del archivo
     * @param req: Request
     * @param res: Response
     * @returns: Response
     */
    static async filterArchivo(req: Request, res: Response) {
        try {
            const { texto, tipoArchivo, autor } = req.query;

            const filtro: any = {};
            let carpetasCoincidentes: string | any[] = [];

            // Filtro por texto (nombre del archivo o tipoArchivo)
            if (texto) {
                filtro.$or = [
                    { nombre: { $regex: texto, $options: 'i' } },
                    { tipoArchivo: { $regex: texto, $options: 'i' } }
                ];
                carpetasCoincidentes = await Folder.find({
                    nombre: { $regex: texto as string, $options: 'i' }
                });
            }

            // Filtro por tipo de archivo (por si se desea buscar por tipo aparte de la barra de búsqueda)
            if (tipoArchivo) {
                filtro.tipoArchivo = { $regex: tipoArchivo, $options: 'i' };
            }

            // Filtro por autor (asegura que sea un ObjectId válido si aplica)
            if (autor) {
                if (!mongoose.Types.ObjectId.isValid(autor as string)) {
                    res.status(400).json({ message: 'ID de autor inválido' });
                    return;
                }
                filtro.autor = autor;
            }

            // Si no hay ningún filtro válido, no hacemos búsqueda
            if (Object.keys(filtro).length === 0 && !texto) {
                res.status(400).json({ message: 'Debe proporcionar al menos un parámetro de búsqueda' });
                return;
            }

            // Buscar archivos según filtros
            const archivos = await Archivo.find(filtro).populate('folder');

            // Si no hay resultados en ambos
            if (archivos.length === 0 && carpetasCoincidentes.length === 0) {
                res.status(404).json({ message: 'No se encontraron resultados con esos criterios' });
                return;
            }

            res.status(200).json({
                carpetas: carpetasCoincidentes,
                archivos
            });
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ message: err.message });
        }
    }

    static async updateFile(req: Request, res: Response) {
        try{
            const { id } = req.params;
            const data: Partial<IArchivo> = req.body;
            const resultado = await Archivo.findByIdAndUpdate(id,data,{new: true});
    
            if(!resultado){
                res.status(404).json({
                    message: 'No se pudo editar el archivo'
                })
                return;
            }
            res.status(200).json({
                resultado
            })
        }catch(error){
            const err = error as Error;
            res.status(500).json({
                message: err.message
            });
        }
    }
}
export default BibliotecaController;
