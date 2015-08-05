/**
 * Created by bindhyeswarimishra on 8/5/15.
 */

console.log('Hello World!');

var data_types = {
    json: {
        mime: 'application/json'
    },
    urlencoded: {
        mime: 'application/x-www-form-urlencoded'
    },
    xml: {
        mime: 'application/xml'
    }
};

/**
 * @function transformData
 * @description Convert the data from one mime type to another
 * @param verb {string} One of the common verbs --> GET, POST, PUT or DELETE
 * @param url {string} Url string for the ajax call
 * */
function transformData(data, input_format, op_format) {
    // route the input data to the correct function
    switch (input_format + '|' + op_format) {
        case ('urlencoded|json'): return urlToJSON(data);
    }
    function jsonTourl() {

    }
    function urlToJSON(str) {
        var regex = /&?([^=]+)=([^&]+)/gmi;
        var obj = {};
        var match;
        do {
            match = regex.exec(str);
            if (match) {
                var prop = decodeURIComponent(match[1]);
                var value = decodeURIComponent(match[2]);
                obj[prop] = value;
            }
            console.log(match);
        } while (match);
        console.log('done');
        return obj;
    }
    return null;
}

console.log(transformData({
    name: 'Ronak Jethwa',
    id: 5000
}, 'json', 'urlencoded'));

console.log(transformData('name=Charles%20Park&type%20of%20dev=ui', 'urlencoded', 'json'));

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

function createXMLDocument() {
    var doc = document.implementation.createDocument('', '', null);
    var root = document.createElement('data');
    var name = document.createElement('name');
    name.setAttribute('type', 'full name');
    name.appendChild(document.createTextNode('Lei Xu'));
    root.appendChild(name);
    console.log(root);
}




