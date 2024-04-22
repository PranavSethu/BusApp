// const jwt = require("jsonwebtoken");
// const cookie = require("cookie");
// const User = require("../models/userModel");

// const verifySession = async (req, res, next) => {
//     try{
//         const authHeader = req.headers['cookie'];
//         const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
//         if(!authHeader) {
//             return res
//                 .status(401)
//                 .json(
//                     {   "status" : "error" ,
//                         "message": "Login required" }
//                         );
//         }
        
//         const cookies = cookie.parse(authHeader);
//         const sessionId = cookies['SessionID'];

//         console.log("cookie",cookie)
//         jwt.verify(sessionId, ACCESS_TOKEN_SECRET, async (err, decoded) => {
//             if (err) { 
//                 return res
//                     .status(401)
//                     .json(
//                         {   "status" : "error" ,
//                             "message": "This session has expired. Please login" }
//                             );
//             }
//             const { id } = decoded; 
//             const user = await User.findById(id); 
//             if (!user) {
//                 return res
//                     .status(401)
//                     .json(
//                         {   "status" : "error" ,
//                             "message": "This session has expired. Please login" }
//                             );
//             }
//             const { password, ...data } = user._doc; 
//             req.user = data; 
//             next();
//         });
//     }catch (err) {
//         console.log(err)
//         return res.status(500).json({
//             status: "error",
//             code: 500,
//             data: [],
//             message: "Server Error",
//         });
//     }

// };

// module.exports = { verifySession };

// ------------------------------------------------------------

const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const User = require("../models/userModel");

const verifySession = async (req, res, next) => {
    try {
        const authHeader = req.headers['cookie'];
        const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

        if (!authHeader) {
            return res.status(401).json({
                "status": "error",
                "message": "Login required"
            });
        }

        const cookies = cookie.parse(authHeader);
        const sessionId = cookies['SessionID'];

        if (!sessionId) {
            return res.status(401).json({
                "status": "error",
                "message": "Session ID not found"
            });
        }

        jwt.verify(sessionId, ACCESS_TOKEN_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    "status": "error",
                    "message": "This session has expired. Please login again"
                });
            }
            const user = await User.findById(decoded.id);
            if (!user) {
                return res.status(404).json({
                    "status": "error",
                    "message": "User not found"
                });
            }
            req.user = user;  // Assign the whole user object if needed, or just an ID
            next();
        });
    } catch (err) {
        console.error('Error verifying session:', err);
        return res.status(500).json({
            "status": "error",
            "message": "Server Error",
            "error": err.toString()
        });
    }
};

module.exports = { verifySession };

