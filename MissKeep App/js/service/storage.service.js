

// function store(key, any) {
//     localStorage[key] = JSON.stringify(any);
// }

// function load(key) {
//     var str = localStorage[key] || 'null';
//     return JSON.parse(str);
// }

function store(key, any) {
    localStorage[key] = JSON.stringify(any);
    return Promise.resolve();
}

function load(key) {
    var str = localStorage[key] || 'null';
    return Promise.resolve(JSON.parse(str));
}

export const storageService = {
    store,
    load
}

