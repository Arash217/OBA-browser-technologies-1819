import * as utils from './utils.js';
import config from './config.js';

export const get = async () => {
    const url = 'http://localhost:3000/singleSearch/singleSearch.xml?q=madonna&resultCount=10';

    const headers = new Headers({
        Authorization: `Basic ${btoa(config.username + ':' + config.password)}`
    });

    const res = await fetch(url, {headers});
    const xml = await res.text();
    const json = utils.xmlToJson(xml);

    console.log(json);
};