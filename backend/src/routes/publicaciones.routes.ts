import { Router } from 'express';
import { createPublicacion, getPublicaciones, getPublicacionById, updatePublicacion, deletePublicacion } from '../controllers/publicacion.controller';

const router = Router();

router.post('/', createPublicacion); // create

router.get('/', getPublicaciones); // read

router.get('/:id', getPublicacionById); // read by id

router.put('/:id', updatePublicacion); // update

router.delete('/:id', deletePublicacion); //delete

export default router;
