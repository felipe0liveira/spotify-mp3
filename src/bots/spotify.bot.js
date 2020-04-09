export default class Spotify {
    constructor(page) {
        this.page = page;
    }

    async getTracks(playlistURL) {
        const tracklist = [];
        await this.page.goto(playlistURL);
        await this.page.waitForSelector('ol.tracklist');

        const musicsEl = await this.page.$$('ol.tracklist .track-name-wrapper');


        for (let i = 0; i < musicsEl.length - 1; i++) {
            const name = await musicsEl[i].$eval('.tracklist-name', el => el.textContent);
            const extra = await musicsEl[i].$eval('.second-line', el => el.textContent);

            tracklist.push({ name, extra });
        }

        return tracklist;
    }
}