const ig = require('./instagram');
const dotenv = require('dotenv');
var express = require("express");

const X_SERVICE_AUTH = "123456";

dotenv.config();

var app = express();

const authorize = (headers) => {
    if (!headers['x-service-auth'])
        return false;
    
    return headers['x-service-auth'] == X_SERVICE_AUTH;
}

app.post("/automationBasedOnTags", (req, res, next) => {
    let headers = req.headers;
    let authorization = authorize(headers);

    if (!authorization) {
        res.status(401).send({message: "Service token not authorized."});
    }

    res.status(200).send();
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

// (async () => {
//     await ig.initialize();
//     //process.argv.slice(2)[0]
//     await ig.login(process.env.LOGIN, process.env.PASSWORD);
//     while (true) {
//         await ig.emailTagProcess(['like4like']);
//     }
//     debugger;
// })();