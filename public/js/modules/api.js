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

    let data = jsonData.Result.Popular.Albums.Album;

    if (!data){
        data = jsonData.Result.Popular.OrderData.Album;
    }

    return await getTracks(data);
};

const getTracks = async album => {
    const url = `http://134.209.89.240:3000/album/${album.AlbumTitle}/artist/${album.Performers.Performer.PresentationName}`;

    const res = await fetch(url);

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