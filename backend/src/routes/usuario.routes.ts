import { Router } from 'express';
import { createUsuario, deleteUsuario, getUsuarioById, getUsuarios, updateUsuario, loginUsuario, registerUsuario, checkAuth } from '../controllers/usuario.controller';
import { authMiddleware } from '@/middlewares/auth.middleware';
import { verificarRoles } from '@/middlewares/roles.middleware';

const router = Router();
//los siguientes endpoints son de uso exclusivo para el superadmin = 0
router.post('/',/* authMiddleware,verificarRoles([0]), */ createUsuario); //create
router.get('/',/* authMiddleware,verificarRoles([0]), */ getUsuarios); //read
router.get('/:id',/* authMiddleware,verificarRoles([0]), */ getUsuarioById); //read by id
router.delete('/:id',/* authMiddleware,verificarRoles([0]), */ deleteUsuario); //delete
// este endpoint es de uso para cualquier usuario registrado
router.put('/:id',/* authMiddleware,verificarRoles([0,1,2]), */ updateUsuario); //update
// para cualquier usuario registrado o no registrados
router.post('/login', loginUsuario); //login
router.post('/register', registerUsuario); //register
router.get('/check', checkAuth);// verificar el token

export default router;
