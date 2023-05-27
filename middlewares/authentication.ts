import {Request, Response, NextFunction} from 'express';
import Token from '../classes/token';

export const validateJWT = (req: any, res: Response, next: NextFunction) =>{

    const userToken = req.get('x-token') || '';

    Token.comprobarToken(userToken).then((decoded: any)=>{
        req['usuario'] = decoded.usuario;
        next();
    }).catch(err=>{
        res.json({
            ok: false,
            msg: 'Token no es es correcto'
        })
    });

}