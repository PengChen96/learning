var headNode;

function loadJS(url) {
    var async = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return new Promise(function (resolve, reject) {
        var script = document.createElement('script');
        script.src = url;
        script.type = 'text/javascript';
        script.async = async;

        script.onload = function () {
            return resolve(script);
        };

        var handleError = function handleError(err) {
            headNode.removeChild(script);
            reject(err);
        };

        script.onerror = handleError;
        script.onabort = handleError;

        if (!headNode) {
            headNode = document.getElementsByTagName('head')[0];
        }

        headNode.appendChild(script);
    });
}

export {
    loadJS
}
