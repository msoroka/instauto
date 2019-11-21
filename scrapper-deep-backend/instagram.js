const puppeteer = require('puppeteer');
const fs = require('fs');

const BASE_URL = 'https://instagram.com/';

const instagram = {
    browser: null,
    page: null,

    initialize: async () => {

        instagram.browser = await puppeteer.launch({
            headless: false,
        });

        instagram.page = await instagram.browser.newPage();
    },

    login: async (user) => {
        let username = user.login;
        let password = user.password;

        await instagram.page.goto(BASE_URL, {
            waitUntil: 'networkidle2'
        });

        /* Click login button from the main site. */
        await instagram.page.waitFor('//a[contains(text(), "Zaloguj się")]');
        let loginButton = await instagram.page.$x('//a[contains(text(), "Zaloguj się")]');
        await loginButton[0].click();

        await instagram.page.waitFor(1000);

        /* Insert username and password. */
        await instagram.page.type('input[name="username"]', username, {
            delay: 500
        });
        await instagram.page.type('input[name="password"]', password, {
            delay: 500
        });

        /* Clicking login button. */
        await instagram.page.$eval('button[type=submit]', el => el.click());

        await instagram.page.waitFor(5000);
    },

    automationBasedOnTags: async (tags, like, follow) => {
        // Choose random tag.
        let tag = tags[Math.floor(Math.random() * tags.length)];

        await instagram.page.goto('https://www.instagram.com/explore/tags/' + tag, {
            waitUntil: 'networkidle2'
        });
        await instagram.page.waitFor(3000);

        let posts = await instagram.page.$$('article > div:nth-child(3) img[decoding="auto"]');

        /* Click single post. */
        await posts[0].click();
        await instagram.page.waitFor('h2[class="BrX75"]');

        // Like process.
        if (like.active) {
            // Randomize like process.
            let randomProbability = Math.floor(1 + Math.random() * (100 + 1 - 1));
            if (randomProbability <= like.probability) {
                await instagram.page.waitFor('span[class="fr66n"]');

                let likeButton = await instagram.page.$('span[class="fr66n"] > button');
                await likeButton.click();

                if (like.imitation) {
                    let imitationDelay = calculateImitationDelay(like.imitation);
                    if (imitationDelay > 0) {
                        await instagram.page.waitFor(imitationDelay * 1000);
                    };
                };
            };
        };

        // Immutable delay after action.
        await instagram.page.waitFor(3000);

        // Follow process.
        await instagram.page.waitFor('div[class="bY2yH"]');
        if (follow.active) {
            let randomProbability = Math.floor(1 + Math.random() * (100 + 1 - 1));
            if (randomProbability <= follow.probability) {
                console.log("FOLLOWING: " + randomProbability);
                let followButton = await instagram.page.$('div[class="bY2yH"] > button');
                await followButton.click();

                if (follow.imitation) {
                    let imitationDelay = calculateImitationDelay(follow.imitation);
                    if (imitationDelay > 0) {
                        await instagram.page.waitFor(imitationDelay * 1000);
                    };
                };
            };
        };

        // Immutable delay after action.
        await instagram.page.waitFor(3000);
    },

    finishAutomation: async () => {
        await instagram.browser.close();
    },

    scrapEmail: async () => {
        /* Enter user profile. */
        let userProfileAnchor = await instagram.page.$('h2[class="BrX75"] > a');
        await userProfileAnchor.click();

        await instagram.page.waitFor('section[class="zwlfE"]');
        await instagram.page.waitFor(2000);

        /* Select description section. */
        let description = await instagram.page.$('div[class="-vDIg"] > span');
        if (description) {
            let text = await instagram.page.evaluate(description => description.textContent, description);

            if (text.includes('@')) {
                let email = extractEmail(text);
                if (email !== null) {
                    saveEmail(email + '\r\n');
                }
            }
        }
    }
}

const calculateImitationDelay = (imitationDelay) => {
    let imitationDelayLowerBound = imitationDelay.from;
    let imitationDelayUpperBound = imitationDelay.to;

    if (imitationDelayLowerBound > 0 && imitationDelayUpperBound > 0) {
        let imitationDelay = Math.floor(imitationDelayLowerBound + Math.random() * (imitationDelayUpperBound + 1 - imitationDelayLowerBound))
        return imitationDelay;
    };

    return 0;
};

let extractEmail = (text) => {
    return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
}

let saveEmail = (email) => {
    fs.appendFile("emails.txt", email, 'utf8', function (err) {
        if (err) {
            console.log('ERROR: ' + err);
        }

        console.log("New email saved! " + email);
    });
}

module.exports = instagram;