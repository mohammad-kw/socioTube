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


const app = express();

dotenv.config();
const PORT = process.env.PORT || 4000;

connectDB();

app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
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
