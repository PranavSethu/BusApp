// const express = require("express");
// require("dotenv").config();
// const mongoose = require('mongoose');
// const cookieParser = require("cookie-parser");
// const app = express();

// // Middleware to log requests
// app.use((req, res, next) => {
//     console.log("path", req.path, " method", req.method);
//     next();
// });

// const cors = require('cors');
// // const validateToken = require("../Backend/middleware/validateTokenHandler")
// app.use(cors());
// app.use(cors({
//     origin: 'http://localhost:3000'  // Adjust this if your front-end origin changes
// }));

// // Middleware to parse JSON bodies
// app.use(express.json());
// app.use(cookieParser());
// // app.use(express.urlencoded({ extended: true }));
// // app.use(validateToken)

// // Import routes
// const AdminRouter = require("./routes/AdminRoutes");
// const TripRouter = require("./routes/TripRoutes");
// const BusRouter = require("./routes/BusRoutes");
// const TicketRouter = require("./routes/TicketRoutes");
// const UserRouter = require("./routes/UserRoutes");
// const AuthRouter = require("./routes/authRoutes");
// // const { validateToken } = require("./middleware/validateTokenHandler");

// // Route middlewares
// app.use("/api/v1/users",UserRouter);
// app.use('/api/v1/bus', BusRouter);
// app.use("/api/v1/admin", AdminRouter);
// app.use("/api/v1/users", TripRouter);
// app.use("/api/v1/users", TicketRouter);
// app.use("/api/v1/auth", AuthRouter);

// // Connect to MongoDB and start the server
// mongoose.connect(process.env.MONGO_URL)
//     .then(() => {
//         app.listen(process.env.PORT, () => {
//             console.log(`MongoDB connected successfully and server listening on port ${process.env.PORT}`);
//         });
//     }).catch((error) => {
//         console.log("MongoDB connection error:", error);
//     });

// module.exports=app;
// ----------------------------------------------------------

// server.js
const express = require("express");
require("dotenv").config();
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const app = express();

// Middleware to log requests
app.use((req, res, next) => {
    console.log("path", req.path, " method", req.method);
    next();
});

// const cors = require('cors');
// const cors = require('cors');
// app.use(cors({
//     origin: ['http://localhost:3000', 'https://bus-app-two.vercel.app/'], 
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE']
// }));

const cors = require('cors');
app.use(cors({
    origin: ['https://bus-app-two.vercel.app', 'http://localhost:3000'], // Your frontend URL and local URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));


// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());

// Import routes
const AdminRouter = require("./routes/AdminRoutes");
const TripRouter = require("./routes/TripRoutes");
const BusRouter = require("./routes/BusRoutes");
const TicketRouter = require("./routes/TicketRoutes");
const { AuthRouter } = require("./routes/authRoutes"); 

// Route middlewares
// app.use("/api/v1/users",UserRouter);
app.use('/api/v1/bus', BusRouter);
app.use("/api/v1/admin", AdminRouter);
app.use("/api/v1/users", TripRouter);
app.use("/api/v1/users", TicketRouter);
app.use("/api/v1/users", AuthRouter);

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`MongoDB connected successfully and server listening on port ${process.env.PORT}`);
        });
    }).catch((error) => {
        console.log("MongoDB connection error:", error);
    });

module.exports = app;
