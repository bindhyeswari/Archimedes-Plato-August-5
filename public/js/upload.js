/**
 * Created by bindhyeswarimishra on 8/5/15.
 */

console.log('Hello World from upload.js on the front end.');

document.addEventListener('DOMContentLoaded', function () {

    var btn = document.querySelector('button');
    var input_element = document.querySelector('input[type="file"]');

    // add an event listener to the button
    btn.addEventListener('click', function () {

        var formdata = new FormData();
        var files = Array.prototype.slice.call(input_element.files);
        formdata = files.reduce(function (formdata, file) {
            formdata.append(file.name, file);
            return formdata;
        }, formdata);
        console.log(formdata);

        // make an ajax call and upload the data ...
        if (files.length) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/files/upload');
            xhr.addEventListener('readystatechange', function () {
                if (xhr.status === 200 && xhr.readyState === 4) {
                    console.log(xhr.responseText);
                }
            });
            xhr.send(formdata);
        }
    });
});