const userModel = require("../models/userModel");
const Usermodel = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

const registerUser = async (req, res) => {
    const { name, email, password, isAdmin } = req.body;
    
    // Check if all fields are provided
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Check if the user already exists
        const userAvailable = await Usermodel.findOne({ email }); // Correctly use findOne and await its result
        if (userAvailable) {
            return res.status(400).json({ message: "User is already registered" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Hashed Password: ", hashedPassword);

        // Assuming creating and saving a new user to the database
        const newUser = new Usermodel({
            
            name,
            email,
            password: hashedPassword,
            isAdmin
        });

        await newUser.save(); // Save the new user

        // Return success message
        return res.json({ message: "User registered successfully", user: { name, email, isAdmin } });

    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({ message: "Internal server error during registration" });
    }
}

const loginUser = async(req,res)=>{
    const{name,email,password,isAdmin} = req.body;
    if(!name||!email||!password){
        return res.status(400).json({message:"All fields are required"})
    }
    const user = await userModel.findOne({email});
    if(user &&(await bcrypt.compare(password,user.password))){
        const accessToken = jwt.sign({
            user: {
                username: user.name,
                email:user.email,
                id: user.id,
            },
        },process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"10m"}
    );
        res.status(200).json({accessToken });

    }else{
        res.status(401)
        throw new Error("email or password is not valid")
    }
}

const CurrentUser = async(req,res)=>{
    if(req.user){
        res.json(req.user);
    }else{
        res.status(404).json({message:"User not found"})
    }
    // res.json({message:"Current user information"});


};
module.exports = {registerUser,loginUser,CurrentUser};