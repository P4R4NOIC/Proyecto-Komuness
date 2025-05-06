import multer from "multer";
import { Router } from 'express';
import { createPublicacion, getPublicaciones, getPublicacionById, updatePublicacion, deletePublicacion, addComentario, getPublicacionesByTag, filterPublicaciones,createPublicacionA } from '../controllers/publicacion.controller';
const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = Router();

router.post('/', createPublicacion); // create
router.post("v2/", upload.array('archivos'), createPublicacionA); //crear con la imagen adjunto

// router.get('/', getPublicaciones); // read

router.get('/', getPublicacionesByTag); // read

router.get('/buscar', filterPublicaciones); // get all publicaciones

router.get('/:id', getPublicacionById); // read by id

router.put('/:id', updatePublicacion); // update

router.delete('/:id', deletePublicacion); //delete

router.post('/:id/comentarios', addComentario); // add comentario

export default router;
