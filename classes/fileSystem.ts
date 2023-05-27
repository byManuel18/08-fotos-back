import { FileUpload } from "../interfaces/file-uploads";

import path from 'path';
import fs from 'fs';
import uniqid from 'uniqid';

export default class FileSystem {
    
    constructor(){}

    guardarImgTemp(img: FileUpload, userId: string){
         
        return new Promise<void>((resolve,reyect)=>{
            const pathC = this.crearCarpetaUsuario(userId);
    
            const nombreArchivo = this.generarNombreUnico(img.name);

            img.mv(`${pathC}/${nombreArchivo}`,(err: any)=>{
                if(err){
                    reyect(err);
                }else{
                    resolve();
                }
            })
        })
        
    }

    private crearCarpetaUsuario(userId: string) {
        const pathUser = path.resolve(__dirname,'../uploads/', userId);
        const pathUserTemp = path.resolve(pathUser, 'tempImg');

        const existe = fs.existsSync(pathUser);
        if(!existe){
           fs.mkdirSync(pathUser); 
           fs.mkdirSync(pathUserTemp); 
        }

        return pathUserTemp;
    }

    private generarNombreUnico(nombreOriginal: string){
        const nombreArr = nombreOriginal.split('.');
        const extension = nombreArr[nombreArr.length - 1 ];

        const idUnico = uniqid();
        return `${idUnico}.${extension}`;

    }

    imagenesDeTEmpHaciaPost(userId:string){
        const pathUser = path.resolve(__dirname,'../uploads/', userId);
        const pathUserTemp = path.resolve(pathUser, 'tempImg');
        const pathPost = path.resolve(pathUser, 'posts');

        if(!fs.existsSync(pathUserTemp)){
            return [];
        }
        if(!fs.existsSync(pathPost)){
            fs.mkdirSync(pathPost); 
        }

        const imagenesTemp = this.optenerImagenesEnTemp(userId);
        imagenesTemp.forEach(img=>{
            fs.renameSync(`${pathUserTemp}/${img}`,`${pathPost}/${img}`);
        });

        return imagenesTemp;
    }

    private optenerImagenesEnTemp (userId: string){
        const pathUserTemp = path.resolve(__dirname,'../uploads', userId ,'tempImg');
        
        return fs.readdirSync(pathUserTemp) || [];
    }

    getFotoUrl(userId: string, img: string){
        const pathFoto = path.resolve(__dirname,'../uploads',userId,'posts',img);
        
        if(fs.existsSync(pathFoto)){
            return pathFoto;
        }else{
            return path.resolve(__dirname, '../assets', '400x250.jpg');
        }
    }
}