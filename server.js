const express = require("express");
const app = express();
const parser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const cookieParser = require('cookie-parser');


app.use(cors());
app.use(parser.json());
app.use(cookieParser());

// Default Route
app.get("/", (req, res) => {
    // add redirect at some point
    res.setHeader("Access-Control-Allow-Origin", "https://heuristic-carson-cc6c87.netlify.app")
    res.status(200).json({
        "status": 200,
        "msg" : "server is up and running"
    })
});

app.options("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "https://heuristic-carson-cc6c87.netlify.app")
    res.status(200)
});

const userRoutes = require("./routes/auth");
app.use("/api", userRoutes);


// Set the port and configure server to listen on that port
app.set('port', PORT);
app.listen(app.get('port'), () => console.log(`PORT: ${app.get("port")} 🌟`));