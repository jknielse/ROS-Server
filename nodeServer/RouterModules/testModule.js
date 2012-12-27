function test(request, response) {
    console.log('The test function just got called');
}

function anotherFunction(request, response) {
}

exports.test = test;
exports.anotherFunction = anotherFunction;
