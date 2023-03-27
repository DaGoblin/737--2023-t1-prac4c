var express = require("express");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var db = require("./database");
const bcrypt = require("bcrypt");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

//Creates Passport local strategy checks sqlite3 DB for usedname and checks password against hasted
passport.use(
    new LocalStrategy(function verify(username, password, cb) {
        db.get(
            `SELECT * FROM users WHERE username = '${username}'`,
            async function (err, row) {
                if (err) {
                    return cb(err);
                }
                if (!row) {
                    return cb(null, false, {
                        message: "Incorrect username or password.",
                    });
                }

                const check = await bcrypt.compare(
                    password,
                    row.hashed_password
                );

                if (check) {
                    let userDetails = { id: row.id, username: row.username };
                    return cb(null, userDetails);
                } else {
                    return cb(null, false, {
                        message: "Incorrect username or password.",
                    });
                }
            }
        );
    })
);

const jwtSecret = "ThisIsTheSecret";

passport.use(
    new JWTStrategy(
        {
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtSecret,
        },
        function (jwtPayload, cb) {
            let userDetails = {
                id: jwtPayload.id,
                username: jwtPayload.username,
            };
            return cb(null, userDetails);
        }
    )
);

