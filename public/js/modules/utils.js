export const xmlToJson = xml => {
    // converting to DOM Tree
    const parser = new DOMParser();
    const srcDOM = parser.parseFromString(xml, "application/xml");
    return domToJson(srcDOM);
};

const domToJson = srcDOM => {
    const children = [...srcDOM.children];

    // base case for recursion.
    if (!children.length) {
        return srcDOM.innerHTML
    }

    // initializing object to be returned.
    const jsonResult = {};

    for (const child of children) {

        // checking is child has siblings of same name.
        const childIsArray = children.filter(eachChild => eachChild.nodeName === child.nodeName).length > 1;

        // if child is array, save the values as array, else as strings.
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