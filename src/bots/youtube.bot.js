export default class Youtube {
    constructor(page) {
        this.page = page;
    }

    async getLink(search) {
        await this.page.goto(`https://www.youtube.com/results?search_query=${search}`);
        await this.page.waitForSelector('#contents > ytd-video-renderer');

        const url = await this.page.$eval('#contents > ytd-video-renderer a', el => el.getAttribute('href'));

        return url;
    }
}