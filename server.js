const express = require("express");
require("dotenv").config();
const app = express();
const passport = require("passport");
//const session = require("express-session");
require("./database");
const auth = require("./auth");
const jwt = require("jsonwebtoken");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());



const jwtSecret = "ThisIsTheSecret";

//Auth APi Routes
app.post("/login", function (req, res, next) {
    passport.authenticate("local", { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: "That didn't work",
                user: user,
            });
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }
            // generate a signed json web token with the contents of user object and return it in the response
            const token = jwt.sign(user, jwtSecret);
            return res.json({ token });
        });
    })(req, res);
});

app.get("/loggedin", (req, res) => {
    res.send("logged in");
});

app.get(
    "/JWTDetails",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        res.send(req.user);
    }
);

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
    console.log(
        `Authentication Microservice listening at http://localhost:${PORT}`
    );
});
