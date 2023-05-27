
import express from 'express';
const cors = require('cors');
import userRoutes from '../routes/usuarios.routes';
import { GeneralRutas } from '../routes/routes';
import { inicializeDB } from '../database';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload'
import postRoutes from '../routes/post.routes';

export default class Server {
    public app: express.Application;
    public port: number = 3000;
    
    constructor(){
        this.app = express();
        this.setMidlewere();
    }

    async start(callback: () => void ){
        try {
            await inicializeDB();
            console.log('Base de datos ONLINE');
            this.app.listen(this.port, callback);
        } catch (error) {
            console.log(error);
        }
    }

    setRoutes(){
        this.app.use(GeneralRutas.USER,userRoutes);
        this.app.use(GeneralRutas.POST,postRoutes);
    }

    setMidlewere(){
        //cords
        this.app.use( cors() );
        
        //parse json
        this.app.use(bodyParser.urlencoded({
            extended: true,
        }));

        this.app.use(bodyParser.json());

        this.app.use(fileUpload({useTempFiles: true}));

        this.setRoutes();
    }
} 