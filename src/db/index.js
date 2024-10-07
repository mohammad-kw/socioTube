// import mongoose from "mongoose";
// import { DB_NAME } from "../constants.js";


// const connectDB = async () => {
//     try {
//         const connectionInstance = await mongoose.connect(`${process.env.DATABASE_URL}/${DB_NAME}`)

//         console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
        
//     } 
//     catch (error) {
//         console.log('MONGODB CONNECTION ERROR: ', error);
//         process.exit(1);
//     }
// }

// export default connectDB



import mongoose from 'mongoose'
import dotenv from 'dotenv'
(dotenv).config();

const connectDB = () => {
    mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log("DB Connected Successfully"))
    .catch( (error) => {
        console.log("DB Connection Failed");
        console.error(error);
        process.exit(1);
    } )
};

export default connectDB