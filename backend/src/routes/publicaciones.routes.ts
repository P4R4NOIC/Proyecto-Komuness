import { Router } from 'express';
import { createPublicacion, getPublicaciones, getPublicacionById, updatePublicacion, deletePublicacion, addComentario, getPublicacionesByTag, filterPublicaciones } from '../controllers/publicacion.controller';

const router = Router();

router.post('/', createPublicacion); // create

// router.get('/', getPublicaciones); // read

router.get('/', getPublicacionesByTag); // read

router.get('/buscar', filterPublicaciones); // get all publicaciones

router.get('/:id', getPublicacionById); // read by id

router.put('/:id', updatePublicacion); // update

router.delete('/:id', deletePublicacion); //delete

router.post('/:id/comentarios', addComentario); // add comentario

export default router;
