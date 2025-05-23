import { Router } from 'express';
import { createUsuario, deleteUsuario, getUsuarioById, getUsuarios, updateUsuario, loginUsuario, registerUsuario } from '../controllers/usuario.controller';

const router = Router();

router.post('/', createUsuario); //create
router.get('/', getUsuarios); //read
router.get('/:id', getUsuarioById); //read by id
router.put('/:id', updateUsuario); //update
router.delete('/:id', deleteUsuario); //delete
router.post('/login', loginUsuario); //login
router.post('/register', registerUsuario); //register

export default router;
