export const xmlToJson = xml => {
    const parser = new DOMParser();
    const srcDOM = parser.parseFromString(xml, "application/xml");
    return domToJson(srcDOM);
};

const domToJson = srcDOM => {
    const children = [...srcDOM.children];

    if (!children.length) {
        return srcDOM.innerHTML
    }

    const jsonResult = {};

    for (const child of children) {
        const childIsArray = children.filter(eachChild => eachChild.nodeName === child.nodeName).length > 1;

        if (childIsArray) {
            if (jsonResult[child.nodeName] === undefined) {
                jsonResult[child.nodeName] = [domToJson(child)];
            } else {
                jsonResult[child.nodeName].push(domToJson(child));
            }
        } else {
            jsonResult[child.nodeName] = domToJson(child);
        }
    }

    return jsonResult;
};

export const request = async (url, init) => {
    const res = await fetch(url, init);
    const data = await res.json();
    if (!res.ok) throw data;
    return data;
};