// require ('dotenv').config()

// import connectDB from "./db/index.js";
// import dotenv from 'dotenv'

// dotenv.config({
//     path: './env'
// })

// connectDB();



import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/index.js'
import {app} from './app.js'

// const app = express();

dotenv.config();

connectDB()
.then( () => {
	app.listen(process.env.PORT || 8000, () => {
		console.log(`Server is running at port: ${process.env.PORT}`);
	})
})
.catch( (err) => {
	console.log('MONGO DB connection failed !!!', err);
	
})
















// import mongoose from "mongoose"
// import { DB_NAME } from "./constants";
// import express from "express"
// const app = express();

// ( async () => {
//     try {
//         await mongoose.connect(`${process.env.DATABASE_URL}/${DB_NAME}`)

//         app.on("error", (error) => {
//             console.log("ERROR: ", error);
//             throw error
//         })

//         app.listen(process.env.PORT, () => {
//             console.log(`App is listening on port ${process.env.PORT}`);
            
//         })
//     } 
//     catch (error) {
//         console.log("ERROR: ", error);
//         throw error
//     }
// })()
