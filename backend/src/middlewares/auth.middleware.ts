import { Request, Response, NextFunction } from 'express';
import { verificarToken } from '../utils/jwt';

/**
 * Middleware para verificar el token de autenticación recuperado desde el cookie
 * @param req - Objeto de solicitud
 * @param res - Objeto de respuesta
 * @param next - Función para pasar al siguiente middleware
 * @returns void
 */
export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({ message: 'No autorizado' });
            return;
        }

        const user = await verificarToken(token);

        console.log(`en la función ${authMiddleware.name} : ` + user);
        if (!user) {
            res.status(401).json({ message: 'No autorizado' });
            return;
        }

        (req as Request & { user?: any }).user = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error interno del servidor (middleware)',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};
