import * as utils from './utils.js';

const username = 'fb2f0c2f-4b5c-4d5c-a020-543fc328d30e';
const password = '8WN8WLYP';

export const get = async () => {
    const url = 'http://localhost:3000/singleSearch/singleSearch.xml?q=madonna&resultCount=10';

    const headers = new Headers({
        Authorization: `Basic ${btoa(username + ':' + password)}`
    });

    const res = await fetch(url, {headers});
    const xml = await res.text();
    const json = utils.xmlToJson(xml);

    console.log(json);
};