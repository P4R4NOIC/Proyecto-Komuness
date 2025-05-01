import { Request, Response } from 'express';
import { Archivo } from '@/models/archivo.model';
import { Folder } from '@/models/folder.model';
import { uploadFile } from '@/utils/digitalOceanSpace';

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
        if (!folderId || !userId) {
            return res.status(400).json({
                success: false,
                message: 'folderId y userId son requeridos',
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
                    return {
                        success: false,
                        nombre: file.originalname,
                        message: 'Error interno al procesar el archivo',
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
     * @param req: Request
     * @param res: Response
     * @returns: Response
     */
    static async list(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'id es requerido',
                errors: []
            });
        }

        try {
            const archivos = await Archivo.find({ folder: id });
            const folders = await Folder.find({ parent: id });

            return res.status(200).json({
                success: true,
                archivos,
                folders
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
     * @description: Crea una carpeta en la biblioteca
     * @route: POST /api/biblioteca/createFolder
     * @param req: Request
     * @param res: Response
     * @returns: Response
     */
    static async createFolder(req: Request, res: Response) {
        const { nombre, parent, userId } = req.body;

        if (!nombre || !parent || !userId) {
            return res.status(400).json({
                success: false,
                message: 'nombre, parent y userId son requeridos',
                errors: []
            });
        }

        try {
            const folder = new Folder({
                nombre,
                parent,
                autor: userId
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

}
export default BibliotecaController;

