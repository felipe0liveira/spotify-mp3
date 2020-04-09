const puppeteer = require('puppeteer');
import Spotify from "./bots/spotify.bot";
import Youtube from './bots/youtube.bot';

(async () => {

    const browser = await puppeteer.launch({ headless: false });

    const preparePage = async (page) => {
        await page.setRequestInterception(true);

        page.on('request', (req) => {
            if (
                req.resourceType() === 'font' ||
                req.resourceType() === 'image'
            ) {
                req.abort();
            }
            else {
                req.continue();
            }
        });
    };

    try {
        const spotifyPage = await browser.newPage();
        await preparePage(spotifyPage);

        const spotify = new Spotify(spotifyPage);

        const playlistURL = 'https://open.spotify.com/playlist/37i9dQZF1DXdSjVZQzv2tl';
        const tracklist = await spotify.getTracks(playlistURL);

        await spotifyPage.close();


        for (let track of tracklist) {
            const youtubePage = await browser.newPage();
            await preparePage(youtubePage);

            const youtube = new Youtube(youtubePage);

            let youtubeLink = await youtube.getLink(track.name);
            await youtubePage.close();
            const link = `https://www.youtube.com/${youtubeLink}`;
            track.youtube = link;
        }

        console.log(tracklist);
    } catch (error) {
        console.error('Error while Scrapping', error);
    } finally {
        await browser.close();
    }
})();