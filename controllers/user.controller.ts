import { Request, Response } from "express";

import { encriptar, rsaDecrypt } from '../utils/passworldUtil'
import { I_Usuario, Usuario } from '../models/usuario.model';
import Token from "../classes/token";

export const createUser = async (req: Request, res: Response)=>{
    try {
        const contraDesencripter = await rsaDecrypt(req.body.password);
        
        const user = {
            nombre: req.body.nombre, 
            email: req.body.email, 
            password:encriptar( contraDesencripter),
            avatar: req.body.avatar, 
        }

        const userDB = await Usuario.create(user);

        res.json({
            ok: true,  
            token: Token.getJwt({
                _id: userDB._id,
                nombre: userDB.nombre,
                email: userDB.email,
                avatar: userDB.avatar
            }),
        });
    } catch (error) {
        res.json({
            ok: false, 
            mensaje: 'Problemas',
            msgErr: error
        });
    }
    
    
}
export const loginUser = async (req: Request, res: Response)=>{
    
    const body = req.body;
   

    try {
        const userDB = await Usuario.findOne({email: body.email});
        if(!userDB){
            return res.json({
                ok: false,
                mensage: 'Usuario o contraseña es incorrecto *',
            });
        }

        const passWorldCadena = await rsaDecrypt(body.password)

        if(userDB.compararPasword(passWorldCadena)){
            return res.json({
                ok: true,
                token: Token.getJwt({
                    _id: userDB._id,
                    nombre: userDB.nombre,
                    email: userDB.email,
                    avatar: userDB.avatar
                })
            });
        }else{
            return res.json({
                ok: false,
                mensage: 'Usuario o contraseña es incorrecto **',
            }); 
        }
        
    } catch (error) {
        
        return res.json({
            ok: false, 
            erro: error
        });
    }

}

export const updateUser = async (req: any, res: Response)=>{

       
    const user = {
        nombre: req.body.nombre, 
        email: req.body.email, 
        avatar: req.body.avatar, 
    }
    
    try {
        const userDB = await  Usuario.findByIdAndUpdate(req.usuario._id,user,{new: true});

        if(!userDB){
            return res.json({
                ok: false,
                mensage: 'Usuario no encontrado',
            }); 
        }else{

            return res.json({
                ok: true,
                token: Token.getJwt({
                    _id: userDB._id,
                    nombre: userDB.nombre,
                    email: userDB.email,
                    avatar: userDB.avatar
                }),
                usuario: userDB
            });

        }
        
    } catch (error) {
        return res.json({
            ok: false, 
            erro: error
        });
    }
   
    
}

export const refreshToken = (req: any,res:Response) => {
    const usuario = req.usuario;
    return res.json({
        ok: true,
        usuario,
        token: Token.getJwt(usuario)
    });
}