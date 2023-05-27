import { Router } from "express";
import { createUser, loginUser, refreshToken, updateUser } from "../controllers/user.controller";
import { validateJWT } from "../middlewares/authentication";


const userRoutes = Router();

userRoutes.post('/create',createUser);

userRoutes.post('/login',loginUser);

userRoutes.post('/update',validateJWT,updateUser);

userRoutes.get('/',[validateJWT],refreshToken)
export default userRoutes;