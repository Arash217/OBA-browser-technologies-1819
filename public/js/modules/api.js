import * as utils from './utils.js';
import config from './config.js';

export const get = async () => {
    const url = 'http://134.209.89.240:3000/singleSearch/singleSearch.xml?q=9789080940543&resultCount=1';

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
