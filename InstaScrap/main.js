const ig = require('./instagram');

(async () => {
    await ig.initialize();
    //process.argv.slice(2)[0]
    // await ig.login('amkreysak', 'ugibugi123');
    while (true) {
        await ig.emailTagProcess(['polishgirl']);
    }

    debugger;
})()