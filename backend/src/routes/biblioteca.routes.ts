import multer from "multer";
import { Router } from "express";
import BibliotecaController from "../controllers/biblioteca.controller";
import { upload } from "../middlewares/multer.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";
import { verificarRoles } from "../middlewares/roles.middleware";
//const storage = multer.memoryStorage();
//const upload = multer({ storage });

const router = Router();


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
// solo los tipoUsuarios 0, 1 y 2 pueden subir archivos
router.post("/upload", upload.array('archivos'), authMiddleware, verificarRoles([0, 1, 2]), BibliotecaController.uploadFiles as any);

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
//solo los tipoUsuarios 0 y 1  pueden eliminar archivos
router.delete("/delete/:id", authMiddleware, verificarRoles([0, 1]), BibliotecaController.deleteFile as any);


/**
 * Posibles respuestas del endpoint:
 * HTTP 200:
 *  {
 *      success: true,
 *      results: {archivo[]}
 *  }
 * 
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
router.route("/buscar").get(BibliotecaController.filterArchivo as any);


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
router.get("/list/:id", /*authMiddleware, verificarRoles([0, 1]),*/ BibliotecaController.list as any);
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
//solo los tipoUsuarios 0 y 1  pueden crear carpetas
router.post("/folder", authMiddleware, verificarRoles([0, 1]), BibliotecaController.createFolder as any);
/**
 * Posibles respuestas del endpoint:
 * HTTP 200:
 * {
 *      success: rue,
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
//solo los tipoUsuarios 0 y 1  pueden eliminar carpetas
router.route("/folder/:id").delete(authMiddleware, verificarRoles([0, 1]), BibliotecaController.deleteFolder as any);
/**
 * Posibles respuestas del endpoint: actualizacion de los metadatos del archivo
 * HTTP 200:
 *  {
 *      success: true,
 *      message:'Archivo actualizado correctamente',
 *      content: archivo,
 *  }
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
 *      message:'Error del sistema',
 *      error: error.message    
 *  }
 * 
 */
//solo los tipoUsuarios 0 y 1  pueden actualizar archivos
router.put("/edit/:id", authMiddleware, verificarRoles([0, 1]), BibliotecaController.updateFile as any);


export default router;

