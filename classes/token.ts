import jwt from 'jsonwebtoken';

export default class Token {


    private static seed : string = 'ESTE ES EL SEED DE MI TOKEN';
    private static caducidad: string = '30d';

    constructor(){

    }

    static getJwt(payload: any): string{
        return jwt.sign({usuario: payload},this.seed,{expiresIn: this.caducidad});
    }

    static comprobarToken(token: string): Promise<any>{
        return new Promise((resolve, reyect)=>{

            jwt.verify(token, this.seed,(err,decoded)=>{
                if(err){
                    reyect(err);
                }else{
                    resolve(decoded);
                }
            })
        })
    }

}