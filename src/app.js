import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

// jab bhi hum koi middleware use krenge to most of the time hum app.use ke through hi krenge

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: '16kb'}))
app.use(express.urlencoded({extended: true, limit: '16kb'}))
app.use(express.static('public'))
app.use(cookieParser())

// 1. json ka data ayega to uske liye limit kerdi ke itna hi aye nhi to app crash bhi ho skta h

// 2. url me special characters ko encoded kiya jata h
// extended option -> isme object ke andr bhi object de skte h  

// 3. jb koi image ya file ati h to hum unhe store krna chahte h to hum ek static public folder bna dete h jisme wo store ho jti h

// 4. cookie-parser -> iska kam itna hi h ke hum apne server se jo user ka browser h uski cookies ko access ker ske or set bhi ker ske


// routes import
import userRouter from './routes/user.routes.js'

// routes declaration
app.use('/api/v1/users', userRouter)




export {app}

