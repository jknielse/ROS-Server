/*
 *
 * router.js is a nodejs module that will automatically route server calls
 *  to functions within the modules that it knows about, provided the server
 *  call is named "modulename/functionname"
 *
 * For example, if there were a module (robot.js) and it exported a function
 *  (move(request,response)), then a call to "localhost:8888/robot/move" would
 *  cause router.js to return the function move(request,response).
 *
 */

fs = require('fs');

//retrieve the filenames of the modules
var modulePaths = fs.readdirSync('./RouterModules');
var modules = [];

//Add all of the modules into the modules list
for (var mod in modulePaths) {
    var modName = modulePaths[mod].replace('.js', '');
    var module = {};
    module.exports = require('./RouterModules/' + modName);
    module.name = modName;
    modules.push(module);
}

var routeList = [];

console.log('Enumerating available routes...\n');
for (var mod in modules) {
    for (var func in modules[mod].exports) {
        var routeKey = '' + modules[mod].name + '/' + func;
        var routeFunc = modules[mod].exports[func];
        console.log('    ' + routeKey);
        routeList[routeKey] = routeFunc;
    }
}

function nullRoute(request, response) {
    //For now, we simply do nothing if a route wasn't found.
}

//route will return a function that takes two arguments, assumed to
//be request and response, or it will return a function that expresses
//that there's been an error if there is no such function that it's aware of.

function route(pathname) {
    console.log('Server hit at: \"' + pathname + '\"');
    if(routeList[pathname]) {
        return routeList[pathname];
    }
    else
    {
        console.log('A server path was hit that has no associate route!');
        return nullRoute; 
    }
}

exports.route = route;
