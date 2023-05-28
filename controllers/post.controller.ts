import { Request, Response } from "express";
import { Post } from "../models/post.modele";
import { FileUpload } from "../interfaces/file-uploads";
import FileSystem from "../classes/fileSystem";


const fileSystem = new FileSystem();


export const crearPost = (req: any, res: Response)=>{

    const body = req.body;
    body.usuario = req.usuario._id;

    const imagenes = fileSystem.imagenesDeTEmpHaciaPost(req.usuario._id);
    body.imgs = imagenes;
    Post.create(body).then(async (postDB)=>{
        return res.json({
            ok: true,
            post: postDB
        });
    
    }).catch(err=>{
        return res.json(err);
    });
    
}

export const obtenerPost = async (req: Request, res: Response)=>{
    const limitPage = 10;
    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip *=  limitPage

    const registros = await Post.find()
                                .sort({_id: -1})
                                .skip(skip)
                                .limit(limitPage)
                                .populate('usuario', '-password')
                                .exec();
    
    return res.json({
        ok:true,
        pagina: pagina,
        posts: registros
    });
}


export const subirArchivo =async (req: any, res: Response) =>{
    console.log('rere');
    
    if(!req.files){
        return res.status(400).json({
            ok: false,
            mensaje: 'Ningún Archivo para subir'
        })
    }

    const file: FileUpload = req.files.img; 
    
    if(!file){
        return res.status(400).json({
            ok: false,
            mensaje: 'Ningún Archivo para subir - image'
        })
    }

    if(!file.mimetype.includes('image')){
        return res.status(400).json({
            ok: false,
            mensaje: 'Solo puedes subir imagenes'
        })
    }


    await fileSystem.guardarImgTemp(file,req.usuario._id);

    return res.json({
        ok: true,
        mensaje: 'Archivo subido'
    })

}

export const getArchivo = ( req: Request, res: Response)=>{

    const userId = req.params.userId;
    const img = req.params.img;

    const pathFoto = fileSystem.getFotoUrl(userId,img);
    res.sendFile(pathFoto);

}