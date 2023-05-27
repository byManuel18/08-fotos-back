import mongoose from "mongoose";
const databse: string = 'fotosGram';
 
export const inicializeDB = () => {
    return mongoose.connect(`mongodb://localhost:27017/${databse}`)
}