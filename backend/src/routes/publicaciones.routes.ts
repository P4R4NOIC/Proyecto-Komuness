import multer from "multer";
import { Router } from 'express';
import { createPublicacion, getPublicacionById, updatePublicacion, deletePublicacion, addComentario, getPublicacionesByTag, filterPublicaciones, createPublicacionA } from '../controllers/publicacion.controller';
import { authMiddleware } from "../middlewares/auth.middleware";
import { verificarRoles } from "../middlewares/roles.middleware";
const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = Router();

router.post('/', createPublicacion); // create
//Solo los tipoUsuarios 0 , 1 y 2 pueden crear publicaciones
router.post("/v2", upload.array('archivos'), /*authMiddleware, verificarRoles([0, 1, 2]), */createPublicacionA); //crear con la imagen adjunto

router.get('/', getPublicacionesByTag); // read

router.get('/buscar', filterPublicaciones); // get all publicaciones

router.get('/:id', getPublicacionById); // read by id
//Solo los tipoUsuarios 0 y 1 pueden actualizar publicaciones
router.put('/:id',/* authMiddleware, verificarRoles([0, 1]),*/ updatePublicacion); // update    
//Solo los tipoUsuarios 0 y 1 pueden eliminar publicaciones
router.delete('/:id',/* authMiddleware, verificarRoles([0, 1]),*/ deletePublicacion); //delete
//Solo los tipoUsuarios 0, 1 y 2 pueden agregar comentarios
router.post('/:id/comentarios',/* authMiddleware, verificarRoles([0, 1, 2]),*/ addComentario); // add comentario

export default router;
