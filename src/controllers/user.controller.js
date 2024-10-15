import {asyncHandler} from "../utils/asyncHandler.js"
import {APIerror} from "../utils/APIerror.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {APIresponse} from "../utils/APIresponse.js"


const registerUser = asyncHandler( async (req, res) => {
    // 1. get user details from frontend
    // 2. validation - not empty
    // 3. check if user is already exists -> username, email
    // 4. check for images, avatar
    // 5. upload them to cloudinary
    // 6. create user object -> create entry in db
    // 7. remove password and refresh token field from response
    // 8. check for user creation
    // 9. return res

    // if the data is coming from the file or json directly then u can use req.body
    // for url it is different
    const {username, fullName, email, password} = req.body;
    console.log("email: ", email);

    // here we are just checking if any field is empty or not
    // we have used a new way by implementing .some method
    if (
        [fullName, username, email, password].some((field) => field?.trim() === "")
    ) {
        throw new APIerror(400, "All fields are required");
    }

    // here we have used $or for the or condition
    // to check if email or username exist or not
    const existedUser = User.findOne({
        $or: [{username}, {email}]
    })

    if (existedUser) {
        throw new APIerror(409, "user with email or username already existed")
    }
    
    // The optional chaining (?.) operator accesses an object's property or calls a function.
    // optional chaining (?.) hum tab use kerte h jab hume lgta h ke koi chiz wha available nhi hogi

    // here multer gives us some options and one of them is .files
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new APIerror(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar) {
        throw new APIerror(400, "Avatar file is required")
    }

    const user = await User.create({
        fullName,
        username: username.toLowerCase(),
        email,
        password,
        avatar: avatar.url,
        coverImage: coverImage?.url || ""
    })

    // here _id is the id which mongodb generates every time a new user is created

    // and here we have also user .select method in which we can pass things which we don't want. Fields like password and refreshToken
    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if(!createdUser) {
        throw new APIerror(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new APIresponse(200, createdUser, "User created successfully!")
    )

} )


export {registerUser}