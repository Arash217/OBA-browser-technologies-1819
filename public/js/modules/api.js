// const username = '9a3b72cc-6f4b-4023-b9fe-d414d684b45b';
// const password = 'M39PJCP';

export const get = async () => {

    const url = 'https://api.cdr.nl/singleSearch/singleSearch.xml?q=madonna&resultCount=10';

    let headers = new Headers({
        'Authorization': 'Basic OWEzYjcyY2MtNmY0Yi00MDIzLWI5ZmUtZDQxNGQ2ODRiNDViOk0zOVBKQ1A='
    });

    const res = await fetch(url, {
        method: 'GET',
        'Cache-Control': 'no-cache',
        mode: 'no-cors',
        credentials: "include",
        headers
    });

    console.log(res);
};