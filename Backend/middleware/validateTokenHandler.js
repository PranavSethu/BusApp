const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
    console.log(req.headers)
    let authHeader = req.headers.authorization; // Ensure this is 'authorization' and not 'Authorization' unless you've specifically set it this way

    if (authHeader && authHeader.startsWith("Bearer ")) {
        try {
            // Extract the token from the Authorization header
            const token = authHeader.split(" ")[1];
            console.log("Token received:", token); // Debugging output

            // Verify the token
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    console.log("Token verification error:", err.message); // Debugging output
                    return res.status(401).json({ message: "User is not authorized, token invalid." });
                }
                console.log("Decoded token:", decoded); // Debugging output
                console.log("Access Token Secret Used:", process.env.ACCESS_TOKEN_SECRET); // Make sure this is defined


                // Attach the decoded user to the request object
                req.user = decoded;
                next(); // Proceed to the next middleware or route handler
            });
        } catch (err) {
            // Catch parsing errors or other errors
            console.error("Error handling token:", err);
            res.status(500).json({ message: "Internal server error while processing token." });
        }
    } else {
        // No token was sent
        res.status(401).json({ message: "No token provided, authorization denied." });
    }
};

module.exports = { validateToken };
