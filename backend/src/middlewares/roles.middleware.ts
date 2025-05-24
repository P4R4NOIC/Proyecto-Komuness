import { IUsuario } from '@/interfaces/usuario.interface';
import { Request, Response, NextFunction } from 'express';
/**
 *  verificar roles: Es una fabrica que devuelve una funcion que recibe los roles permitidos y devuelve una funcion que recibe el request, response y next
 * @param roles roles permitidos
 * @returns una funcion que recibe el request, response y next
 */
export const verificarRoles = (roles: number[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = (req as any).user as IUsuario;
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'No autorizado'
            });
        }

        if (!roles.includes(user.tipoUsuario)) {
            return res.status(403).json({
                success: false,
                message: 'No autorizado'
            });
        }
        //si pasa las dos condiciones, entonces el usuario tiene los roles permitidos
        next();
    }

}