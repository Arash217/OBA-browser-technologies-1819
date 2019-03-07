import * as utils from './utils.js';
import config from './config.js';

let token = null;

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

const getSpotifyToken = async () => {
    const client_id = '71275f4b1eb54fdc969578e0af48fbe3';
    const client_secret = '08645c05ab8b46f5af323c8f7bda2b98';

    const formData = new URLSearchParams();
    formData.append('grant_type', 'client_credentials');

    const res = await fetch('http://134.209.89.240:3001/accounts/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
        },
        body: formData.toString(),
        json: true
    });

    const data = await res.json();
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
    console.log(spotifyAlbum);
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
    const res = await fetch(`http://134.209.89.240:3001/api/v1/search?q=${encodeURIComponent(albumTitle)}+artist:${encodeURIComponent(artist)}&type=album&limit=1`, {
        headers: {
            'Authorization': 'Bearer ' + token
        },
        json: true
    });

    const data = await res.json();

    let spotifyAlbum = data.albums.items[0];

    console.log(data);

    // if (data.albums.length > 0){
    //     spotifyAlbum = data.albums.items[0];
    // } else {
    //     throw Error('Something went wrong');
    // }

    return spotifyAlbum;
};

const getSpotifyTracks = async albumId => {
    const res = await fetch(`http://134.209.89.240:3001/api/v1/albums/${albumId}/tracks`, {
        headers: {
            'Authorization': 'Bearer ' + token
        },
        json: true
    });

    return res.json();
};