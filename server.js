const express = require("express");
const app = express();
const parser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const cookieParser = require('cookie-parser');


// app.use(cors({credentials: true, origin: true}));
app.use(cors());
app.use(parser.json());
app.use(cookieParser());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://heuristic-carson-cc6c87.netlify.app");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// Default Route
app.get("/", (req, res) => {
    // add redirect at some point
    res.status(200).json({
        "status": 200,
        "msg" : "server is up and running"
    })
});

// app.options("/", (req, res) => {
//     res.setHeader("Access-Control-Allow-Origin", "https://heuristic-carson-cc6c87.netlify.app")
//     res.status(200)
// });

const userRoutes = require("./routes/auth");
app.use("/api", userRoutes);


// Set the port and configure server to listen on that port
app.set('port', PORT);
app.listen(app.get('port'), () => console.log(`PORT: ${app.get("port")} 🌟`));