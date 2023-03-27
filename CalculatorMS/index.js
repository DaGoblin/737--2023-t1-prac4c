const express = require("express");
require("dotenv").config();
const app = express();
const winston = require("winston");
const auth = require("./auth");
const passport = require("passport");
const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    defaultMeta: { service: "calculate-service" },
    transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        new winston.transports.File({ filename: "error.log", level: "error" }),
        new winston.transports.File({ filename: "debug.log", level: "debug" }),
        new winston.transports.File({ filename: "combined.log" }),
    ],
});

// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== "production") {
    logger.add(
        new winston.transports.Console({
            format: winston.format.simple(),
        })
    );
}

app.get("/", (req, res) => {
    res.send("Calculator Microservice");
});

const add = (num1, num2) => {
    const result = num1 + num2;
    logger.debug(`add called num1 = ${num1}, num2 = ${num2}, Result ${result}`);
    return result;
};

const subtract = (num1, num2) => {
    const result = num1 - num2;
    logger.debug(
        `subtract called num1 = ${num1}, num2 = ${num2}, Result ${result}`
    );
    return result;
};

const divide = (num1, num2) => {
    const result = num1 / num2;
    logger.debug(
        `divide called num1 = ${num1}, num2 = ${num2}, Result ${result}`
    );
    return result;
};

const multiply = (num1, num2) => {
    const result = num1 * num2;
    logger.debug(
        `multiply called num1 = ${num1}, num2 = ${num2}, Result ${result}`
    );
    return result;
};

app.get(
    "/add/:num1/:num2",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        try {
            const num1 = parseFloat(req.params.num1);
            const num2 = parseFloat(req.params.num2);
            if (isNaN(num1)) {
                logger.error("n1 is incorrectly defined");
                throw new Error("n1 incorrectly defined");
            }
            if (isNaN(num2)) {
                logger.error("n2 is incorrectly defined");
                throw new Error("n2 incorrectly defined");
            }

            logger.info(`Parameters ${num1} and ${num2} received for addition`);
            const result = add(num1, num2);
            res.status(200).json({ statuscode: 200, data: result });
        } catch (error) {
            console.error(error);
            res.status(500).json({ statuscode: 500, msg: error.toString() });
        }
    }
);

app.get(
    "/subtract",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        try {
            const num1 = parseFloat(req.query.n1);
            const num2 = parseFloat(req.query.n2);
            if (isNaN(num1)) {
                logger.error("n1 is incorrectly defined");
                throw new Error("n1 incorrectly defined");
            }
            if (isNaN(num2)) {
                logger.error("n2 is incorrectly defined");
                throw new Error("n2 incorrectly defined");
            }

            logger.info(
                `Parameters ${num1} and ${num2} received for subtraction`
            );

            const result = subtract(num1, num2);
            res.status(200).json({ statuscode: 200, data: result });
        } catch (error) {
            console.error(error);
            res.status(500).json({ statuscode: 500, msg: error.toString() });
        }
    }
);

app.get(
    "/multiply",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        try {
            const num1 = parseFloat(req.query.n1);
            const num2 = parseFloat(req.query.n2);
            if (isNaN(num1)) {
                logger.error("n1 is incorrectly defined");
                throw new Error("n1 incorrectly defined");
            }
            if (isNaN(num2)) {
                logger.error("n2 is incorrectly defined");
                throw new Error("n2 incorrectly defined");
            }

            logger.info(
                `Parameters ${num1} and ${num2} received for multiplication`
            );
            const result = multiply(num1, num2);
            res.status(200).json({ statuscode: 200, data: result });
        } catch (error) {
            console.error(error);
            res.status(500).json({ statuscode: 500, msg: error.toString() });
        }
    }
);

app.get(
    "/divide",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        try {
            const num1 = parseFloat(req.query.n1);
            const num2 = parseFloat(req.query.n2);
            if (isNaN(num1)) {
                logger.error("n1 is incorrectly defined");
                throw new Error("n1 incorrectly defined");
            }
            if (isNaN(num2)) {
                logger.error("n2 is incorrectly defined");
                throw new Error("n2 incorrectly defined");
            }

            logger.info(`Parameters ${num1} and ${num2} received for division`);

            const result = divide(num1, num2);
            res.status(200).json({ statuscode: 200, data: result });
        } catch (error) {
            console.error(error);
            res.status(500).json({ statuscode: 500, msg: error.toString() });
        }
    }
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Microservice listening at http://localhost:${PORT}`);
});
