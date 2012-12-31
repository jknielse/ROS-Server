var http = require("http");
var url = require("url");
var router = require("./router");

String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, "").replace(/^\/+|\/+$/g, "");
};

function startServer() {
    http.createServer(function(request, response) {
        var path = url.parse(request.url).pathname.trim();

        //Pass the path to the router, and pass request and response
        //to the function that the router finds.
        router.route(path)(request, response);
    }).listen(54545);
}

exports.start = startServer;
