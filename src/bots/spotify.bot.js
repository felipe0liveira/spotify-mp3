const puppeteer = require('puppeteer');

const Bot = {};

Bot.getTracksFrom = async (playlistURL) => {
    const tracklist = [];
    const browser = await puppeteer.launch();
    try {
        const page = await browser.newPage();

        await page.goto(playlistURL);
        await page.waitForSelector('ol.tracklist');

        const musicsEl = await page.$$('ol.tracklist .track-name-wrapper');


        for (let i = 0; i < musicsEl.length - 1; i++) {
            const name = await musicsEl[i].$eval('.tracklist-name', el => el.textContent);
            const extra = await musicsEl[i].$eval('.second-line', el => el.textContent);

            tracklist.push({ name, extra });
        }
    } catch (error) {
        console.error('Error while scrapping Spotify', error);
    } finally {
        await browser.close();
    }
    return tracklist;
};

module.exports = Bot;