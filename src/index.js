const spotify = require('./bots/spotify.bot');

(async () => {
    const playlistURL = 'https://open.spotify.com/playlist/37i9dQZF1DXdSjVZQzv2tl';
    const tracks = await spotify.getTracksFrom(playlistURL);

    console.log(tracks);    
})();