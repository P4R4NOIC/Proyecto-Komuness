import { IUsuario } from '@/interfaces/usuario.interface';
import { Request, Response, NextFunction } from 'express';
/**
 *  verificar roles: Es una fabrica que devuelve una funcion que recibe los roles permitidos y devuelve una funcion que recibe el request, response y next
 * @param roles roles permitidos
 * @returns una funcion que recibe el request, response y next
 */
export const verificarRoles = (roles: number[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = (req as Request & { user?: IUsuario }).user;
        if (!user) {
            res.status(401).json({
                success: false,
                message: 'No hay usuario'
            });
            return;
        }

        if (!roles.includes(user.tipoUsuario)) {
            res.status(403).json({
                success: false,
                message: 'No tienes los suficientes permisos'
            });
            return;
        }
        //si pasa las dos condiciones, entonces el usuario tiene los roles permitidos
        next();
    }

}