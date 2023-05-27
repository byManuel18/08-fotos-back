import { Schema, model, Document } from 'mongoose';
import { decrypt } from '../utils/passworldUtil';

const usuarioSchema = new Schema({
    nombre:{
        type: String,
        require: [true, 'El nombre es necesario']
    },
    avatar:{
        type: String,
        default: 'av-1.png'
    },
    email:{
        type: String,
        unique: true,
        require: [true, 'El correo es necesario']
    },
    password:{
        type: String,
        require: [true, 'La contraseña es necesario']
    }
});

// usuarioSchema.methods.toJSON = function() {
//     let obj = this.toObject();
//     delete obj.password;
//     return obj;
// }

usuarioSchema.method('compararPasword', function (password: string = ''){
    return decrypt(password, this.password);
})

export interface I_Usuario extends Document{
    nombre: string, 
    email: string, 
    password: string,
    avatar: string,
    compararPasword(password: string): boolean
}

export const Usuario = model<I_Usuario>('Usuario', usuarioSchema)