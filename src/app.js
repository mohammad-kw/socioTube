import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

// jab bhi hum koi middleware use krenge to most of the time hum app.use ke through hi krenge

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// 1. json ka data ayega to uske liye limit kerdi ke itna hi aye nhi to app crash bhi ho skta h
app.use(express.json({limit: '16kb'}))
// 2. url me special characters ko encoded kiya jata h
// extended option -> isme object ke andr bhi object de skte h  
app.use(express.urlencoded({extended: true, limit: '16kb'}))
// 3. jb koi image ya file ati h to hum unhe store krna chahte h to hum ek static public folder bna dete h jisme wo store ho jti h
app.use(express.static('public'))

// cookie-parser -> iska kam itna hi h ke hum apne server se jo user ka browser h uski cookies ko access ker ske or set bhi ker ske
app.use(cookieParser())

export {app}

