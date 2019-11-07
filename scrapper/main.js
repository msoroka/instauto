const ig = require('./instagram');
const dotenv = require('dotenv');

dotenv.config();

(async () => {
    await ig.initialize();
    //process.argv.slice(2)[0]
    await ig.login(process.env.LOGIN, process.env.PASSWORD);
    while (true) {
        await ig.emailTagProcess(['like4like']);
    }
    debugger;
})();