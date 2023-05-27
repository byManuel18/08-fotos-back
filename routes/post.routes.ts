import { Router } from "express";

import { validateJWT } from "../middlewares/authentication";
import { crearPost, getArchivo, obtenerPost, subirArchivo } from "../controllers/post.controller";




const postRoutes = Router();

postRoutes.post('/',[validateJWT],crearPost);

postRoutes.get('/',obtenerPost);


postRoutes.post('/upload',[validateJWT],subirArchivo);

postRoutes.get('/imagen/:userId/:img',getArchivo);


export default postRoutes;