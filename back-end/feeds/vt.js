module.exports = {
    info: function () {
        return("Virus Total");
        },

    data: function (req) {
        var querystring = require('querystring');
        var https = require("https");
        var fs = require("fs");
        var q = require("deferred");
        var host = "www.virustotal.com";
        var apiUrl = "/vtapi/v2/file/report";
        var port = 443;
        var resource = req;
        var apikey = "065d00685e274ea2261493fb28afb039adacb5211a54fea8098d09d726b8a4a3";
        var method = "GET";
        var promise = q();

        function performRequest(apiUrl, method, data, success) {
            var dataString = JSON.stringify(data);
            var headers = {};
            if (method == 'GET') {
                apiUrl += '?' + querystring.stringify(data);
            }
            else {
                headers = {
                    'Content-Type': 'application/json'
                    , 'Content-Length': dataString.length
                };
            }
            var options = {
                host: host
                , port: port
                , path: apiUrl
                , method: method
                , headers: headers
            };
            var request = https.request(options, function (res2) {
                res2.setEncoding('UTF-8');
                var responseString = '';
                res2.on('data', function (data) {
                    //console.log(`--chunk-- ${data}`);
                    responseString += data;
                });
                res2.on('end', function () {
                    console.log("GOT VT DATA");
                    var responseObject = JSON.parse(responseString);
                    promise.resolve(responseObject);
                    //success(responseObject);
                    return responseObject;
                });;
            });
            request.on("error", function (err) {
                console.log('problem with request: ${err.message}');
            });
            request.end();
        }

        performRequest(apiUrl, 'GET', {
            resource: resource
            , apikey: apikey
        });
        console.log('returning promise.promise');
        return promise.promise;
    }
}
