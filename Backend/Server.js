const express = require("express");
require("dotenv").config();
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const app = express();

app.use((req, res, next) => {
    console.log("path", req.path, " method", req.method);
    next();
});

const cors = require('cors');
app.use(cors({
    origin: ['https://bus-app-two.vercel.app', 'http://localhost:3000'], 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));


app.use(express.json());
app.use(cookieParser());

const AdminRouter = require("./routes/AdminRoutes");
const TripRouter = require("./routes/TripRoutes");
const BusRouter = require("./routes/BusRoutes");
const TicketRouter = require("./routes/TicketRoutes");
const { AuthRouter } = require("./routes/authRoutes"); 

app.use('/api/v1/bus', BusRouter);
app.use("/api/v1/admin", AdminRouter);
app.use("/api/v1/users", TripRouter);
app.use("/api/v1/users", TicketRouter);
app.use("/api/v1/users", AuthRouter);

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`MongoDB connected successfully and server listening on port ${process.env.PORT}`);
        });
    }).catch((error) => {
        console.log("MongoDB connection error:", error);
    });

module.exports = app;
