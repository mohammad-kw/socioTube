import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'


const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        avatar: {
            type: String,        // cloudinary url
            required: true,
        },
        coverImage: {
            type: String,        // cloudinary url
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            required: [true, "Password is required"]
        },
        refreshToken: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

// pre hook--->
// when the data is going to be saved just before that it will perform the task which ever we want it to  

// we are using the pre hook here
// the event on which we want to perform a task is save
// one thing to remember here is that don't use the arrow function inside this
// Because arrow function don't support the .this
// and we will need .this 

// and also this functions take time so use async await here

userSchema.pre("save", async function (next) {

    // we applied condition here because
    // hume password sirf tabhi hash krna h jab wo naya ho ya fir humne use update kra ho
    if(!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

// we have made a custom method here to check if the password is correct or not
userSchema.methods.isPasswordCorrect = async function (password) {

    // here it will compare both the password (password-> which user has provided in string)
    // (this.password-> which is an encrypted password)
    // and provide us an ans in true or false
    return await bcrypt.compare(password, this.password)
}

// ---> jwt is an bearer token
// bearer token -> jo bhi ye token send krega wo data access ker payega

userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}


userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model("User", userSchema)
