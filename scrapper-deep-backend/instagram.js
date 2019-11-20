const puppeteer = require('puppeteer');
const fs = require('fs');

const BASE_URL = 'https://instagram.com/';

const instagram = {
    browser: null,
    page: null,

    initialize: async () => {

        instagram.browser = await puppeteer.launch({
            headless: false
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
        await instagram.page.waitFor(1000);

        // await instagram.page.waitFor('a > span[aria-label="Profil]');
        // await instagram.page.waitFor(1000);
    },

    emailTagProcess: async (tags, like) => {
        // Choose random tag.
        let tag = tags[Math.floor(Math.random() * tags.length)];

        await instagram.page.goto('https://www.instagram.com/explore/tags/' + tag, {
            waitUntil: 'networkidle2'
        });
        await instagram.page.waitFor(1000);

        let posts = await instagram.page.$$('article > div:nth-child(3) img[decoding="auto"]');

        /* Click single post. */
        await posts[0].click();
        await instagram.page.waitFor('h2[class="BrX75"]');

        // Like process.
        await instagram.page.waitFor('span[class="fr66n"]');
        if (like.active) {
            let likeButton = await instagram.page.$('span[class="fr66n"] > button');
            await likeButton.click();

            if (like.imitation) {
                let imitationDelayLowerBound = like.imitation.from;
                let imitationDelayUpperBound = like.imitation.to;

                if (imitationDelayLowerBound > 0 && imitationDelayUpperBound > 0) {
                    let imitationDelay = Math.floor(imitationDelayLowerBound + Math.random() * (like.imitation.to + 1 - imitationDelayLowerBound))
                    await instagram.page.waitFor(imitationDelay);
                };
            };
        };

        await instagram.page.waitFor(2000);
    },

    automationBasedOnTags: async (tags) => {

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