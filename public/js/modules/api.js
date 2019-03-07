import * as utils from './utils.js';
import config from './config.js';

export const getTracksByAlbumISBN = async ISBN => {
    const url = `http://134.209.89.240:3000/singleSearch/singleSearch.xml?q=${ISBN}&resultCount=1`;

    const headers = new Headers({
        Authorization: `Basic ${btoa(config.username + ':' + config.password)}`
    });

    const res = await fetch(url, {headers});

    if (!res.ok) {
        throw Error('Something went wrong')
    }

    const xml = await res.text();
    const jsonData = utils.xmlToJson(xml);

    console.log(jsonData);

    let data = jsonData.Result.Popular.Albums.Album;

    if (!data){
        data = jsonData.Result.Popular.OrderData.Album;
    }

    return await getTracks(data);
};

const getTracks = async album => {

    const albumTitle = album.AlbumTitle;
    let artist = '';

    if (album.Performers !== ''){
        artist = album.Performers.Performer.PresentationName;
    }

    const url = `http://134.209.89.240:3000/tracks`;

    const res = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            albumTitle,
            artist
        })
    });

    if (!res.ok) {
        throw Error('Something went wrong')
    }

    const data = await res.json();

    const albumAndTracks = {
        tracks: data.items,
        album: album
    };

    const {Cover} = albumAndTracks.album;
    albumAndTracks.album.Cover = Cover.replace('PICO', 'SUPERLARGE');

    return albumAndTracks;
};