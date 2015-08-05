/**
 * Created by bindhyeswarimishra on 8/5/15.
 */

console.log('Hello World!');

/**
 * @function ajax
 * @description Make an ajax call
 * @param verb {string} One of the common verbs --> GET, POST, PUT or DELETE
 * @param url {string} Url string for the ajax call
 * @param data {object} Data that should be sent along with the request (GET --> convert the object to url encoded)
 * @param success {function} Callback to be executed if the call is successful
 * @param error {function} Callback to be executed if the call is unsuccessful
 * */
function ajax(verb, url, data, success, error) {

    verb = verb.toLowerCase().trim();
    // write an XMLHttpRequest
    var xhr = new XMLHttpRequest();
    if (verb === 'get' && typeof data !== 'undefined') {
        // generate the query string and attach it to the url
        // { name: 'Charles Park' } --> ?name=Charles%20Park
        var arr = [];
        for (var prop in data) {
            arr.push(encodeURIComponent(prop) + '=' + encodeURIComponent(data[prop]));
        }
        console.log(arr);
        url += '?' + arr.join('&');
        console.log(url);
    }
    xhr.open(verb, url);
    if (/put|post/gmi.test(verb)) {
        xhr.setRequestHeader('Content-Type', 'application/json');
    }
    xhr.addEventListener('readystatechange', function () {
        if (xhr.status === 200 && xhr.readyState === 4) {
            success(xhr.responseText);
        }
    });
    if (/put|post/gmi.test(verb) && typeof data !== 'undefined') {
        xhr.send(JSON.stringify(data));
    } else {
        xhr.send();
    }
}

ajax('GET', '/test', {
    name: 'Charles Park',
    id: 1000,
    'type of dev': 'UI'
}, function (response) {
    console.log(response);
});

ajax('POST', '/test', {
    name: 'Charles Park',
    id: 1000,
    'type of dev': 'UI'
}, function (response) {
    console.log(response);
});