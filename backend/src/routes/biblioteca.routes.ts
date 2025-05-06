import multer from "multer";
import { Router } from "express";
import BibliotecaController from "../controllers/biblioteca.controller";
const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = Router();


/* FRONTEND LEA ESTO Y NO SEA VAGO XD */

//**************** Rutas de los archivos ************************ */
/**FUNCIONA
 * Posibles respuestas del endpoint:
 * HTTP 200 (todos los archivos subidos exitosamente) o 207 (algunos archivos subidos exitosamente) :
 * {
 * success: true,
 * message:'Todos los archivos subidos exitosamente',
 * results: [
 *  {
 *      success: true,
 *      nombre: file.originalname,
 *      message: 'Archivo subido correctamente',
 *      content: archivo
 *  },...
 * ]
 * HTTP 500:
 *  {
 *      success: false,
 *      message:'Error al subir los archivos',
 *  } 
 */
router.post("/upload", upload.array('archivos'), BibliotecaController.uploadFiles as any);

/**
 * Posibles respuestas del endpoint:
 * HTTP 200:
 * {
 *  success: true,
 *  message:'Archivo eliminado correctamente',
 *  results: [
 *      {
 *          success: true,
 *          nombre: file.originalname,
 *          message: 'Archivo eliminado correctamente',
 *      },...
 *  ]
 * }
 * HTTP 400:
 *  {
 *      success: false,
 *      message:'id es requerido',
 *  }
 * HTTP 404:
 *  {
 *      success: false,
 *      message:'Archivo no encontrado',
 *  }
 * HTTP 500:
 *  {
 *      success: false,
 *      message:'Error al eliminar los archivos',
 *      error: error.message
 *  }
*/
router.delete("/delete/:id", BibliotecaController.deleteFile as any);



//**************************** Rutas de las carpetas ****************************** */
/**
 * FUNCIONA
 * Posibles respuestas del endpoint:
 * HTTP 200:
 * {
 *      success: true,
 *      contentFile: archivo[],
 *      contentFolder: folder[],
 * }
 * HTTP 400:
 *  {
 *      success: false,
 *      message:'id es requerido',
 *  }
 * HTTP 404:
 *  {
 *      success: false,
 *      message:'Archivo no encontrado',
 *  }
 * HTTP 500:
 *  {
 *      success: false,
 *      message:'Error al eliminar los archivos',
 *      error: error.message
 *  }
 */
router.get("/list/:id", BibliotecaController.list as any);
/**FUNCIONA
 * Posibles respuestas del endpoint:
 * HTTP 200:
 * {
 *      success: true,
 *      message:'Carpeta creada correctamente',
 *      content: folder,
 * }
 * HTTP 400:
 *  {
 *      success: false,
 *      message:'nombre y parent es requerido',
 *  }
 * HTTP 500:
 *  {
 *      success: false,
 *      message:'Error al crear la carpeta',
 *      error: error.message
 *  }
 */
router.post("/folder", BibliotecaController.createFolder as any);
/**
 * Posibles respuestas del endpoint:
 * HTTP 200:
 * {
 *      succests: rue,
 *      message:'Carpeta eliminada correctamente',
 *      content: folder,
 * }
 * HTTP 400:
 *  {
 *      success: false,
 *      message:'id es requerido',
 *  }
 * HTTP 404:
 *  {
 *      success: false,
 *      message:'Carpeta no encontrada',
 *  }
 * HTTP 500:
 *  {
 *      success: false,
 *      message:'Error del sistema',
 *      error: error.message
 *  }
 */
router.route("/folder/:id").delete(BibliotecaController.deleteFolder as any);

export default router;

