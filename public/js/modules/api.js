import * as utils from './utils.js';
import config from './config.js';

export const get = async () => {
    const url = 'http://134.209.89.240:3000/singleSearch/singleSearch.xml?q=madonna&resultCount=10';

    const headers = new Headers({
        Authorization: `Basic ${btoa(config.username + ':' + config.password)}`
    });

    const res = await fetch(url, {headers});

    if (!res.ok){
        throw Error('Something went wrong')
    }

    const xml = await res.text();

    return utils.xmlToJson(xml);
};