import {xmlToJson, request} from "./utils.js";
import config from './config.js';

let token = null;

export const getTracksByAlbumISBN = async ISBN => {
    const url = `https://134.209.92.164:3001/singleSearch/singleSearch.xml?q=${ISBN}&resultCount=1`;

    const headers = new Headers({
        Authorization: `Basic ${btoa(config.username + ':' + config.password)}`
    });

    const res = await fetch(url, {headers});

    const xml = await res.text();
    const jsonData = xmlToJson(xml);

    let data = jsonData.Result.Popular.Albums.Album;

    if (!data){
        data = jsonData.Result.Popular.OrderData.Album;
    }

    return await getTracks(data);
};

const getSpotifyToken = async () => {
    const formData = new URLSearchParams();
    formData.append('grant_type', 'client_credentials');

    const data = await request('https://134.209.92.164:3002/accounts/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic ' + btoa(config.spotifyID + ':' + config.spotifySecret)
        },
        body: formData.toString(),
        json: true
    });

    token = data.access_token;
};

const getTracks = async album => {

    await getSpotifyToken();

    const albumTitle = album.AlbumTitle;
    let artist = '';

    if (album.Performers !== ''){
        artist = album.Performers.Performer.PresentationName;
    }

    const spotifyAlbum = await getSpotifyAlbum(albumTitle, artist);
    const tracks = await getSpotifyTracks(spotifyAlbum.id);

    const albumAndTracks = {
        tracks: tracks.items,
        album
    };

    const {Cover} = albumAndTracks.album;
    albumAndTracks.album.Cover = Cover.replace('PICO', 'SUPERLARGE');

    return albumAndTracks;
};

const getSpotifyAlbum = async (albumTitle, artist) => {
    const data = await request(`https://134.209.92.164:3002/api/v1/search?q=${encodeURIComponent(albumTitle)}+artist:${encodeURIComponent(artist)}&type=album&limit=1`, {
        headers: {
            Authorization: 'Bearer ' + token
        },
        json: true
    });

    let spotifyAlbum = data.albums.items[0];

    // if (data.albums.length > 0){
    //     spotifyAlbum = data.albums.items[0];
    // } else {
    //     throw Error('Something went wrong');
    // }

    return spotifyAlbum;
};

const getSpotifyTracks = async albumId => {
    const data = await request(`https://134.209.92.164:3002/api/v1/albums/${albumId}/tracks`, {
        headers: {
            Authorization: 'Bearer ' + token
        },
        json: true
    });

    if (!data.items[0].preview_url){
        throw Error();
    }

    return data;
};