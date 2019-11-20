const ig = require('./instagram');
const dotenv = require('dotenv');
const express = require("express");
const bodyParser = require('body-parser');

const X_SERVICE_AUTH = "123456";

dotenv.config();

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const authorize = (headers) => {
    if (!headers['x-service-auth'])
        return false;

    return headers['x-service-auth'] == X_SERVICE_AUTH;
}

app.post("/automationBasedOnTags", (req, res, next) => {
    let headers = req.headers;
    let automationParameters = req.body;

    if (!authorize(headers)) {
        res.status(401).send({
            message: "Service token not authorized."
        });
        return;
    }

    res.status(200).send({
        message: "Automation started sucessfuly."
    });

    let processAvailable = true;
    let timer = 0;

    let automationInterval = setInterval(() => {
        timer += 1;
        if (timer > automationParameters.duration) {
            processAvailable = false;
            clearInterval(automationInterval);
        }
    }, 1000);


    (async () => {
        await ig.initialize();
        await ig.login(automationParameters.user);

        while (processAvailable) {
            await ig.emailTagProcess(automationParameters.tags, automationParameters.like);
        }

        await ig.finishAutomation();
    })();

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