const express = require("express");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const morgan = require("morgan");
const path = require("path");
const db = require("./models");
const passport = require("./middlewares/authentication");
const socket = require("socket.io")
const app = express();
const PORT = process.env.PORT || 8000;

// this lets us parse 'application/json' content in http requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
	expressSession({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
	})
);
app.use(passport.initialize());
app.use(passport.session());

// add http request logging to help us debug and audit app use
const logFormat = process.env.NODE_ENV === "production" ? "combined" : "dev";
app.use(morgan(logFormat));

// this mounts controllers/index.js at the route `/api`
app.use("/api", require("./controllers"));

// for production use, we serve the static react build folder
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../client/build")));

	// all unknown routes should be handed to our react app
	app.get("*", function (req, res) {
		res.sendFile(path.join(__dirname, "../client/build", "index.html"));
	});
}

// update DB tables based on model updates. Does not handle renaming tables/columns
// NOTE: toggling this to true drops all tables (including data)
db.sequelize.sync({ force: false });

// start up the server
const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));

//Add server to socket to allow instant messaging
const io = socket(server)

io.sockets.on("connection", socket => {
    console.log(socket.id)
    socket.on("send-chat-message", (data) => {
        socket.broadcast.emit("chat-message", data)
    })

    socket.on("disconnect", (data) => {

	})
})
