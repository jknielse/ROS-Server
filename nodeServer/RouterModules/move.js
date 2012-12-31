/*
 *      move.js
 *
 *  This module is for controlling robot movement. 
 *  
 *  For the purposes of using it, a movement will
 *  be considered to be a rotation and a magnitude.
 *  It is assumed that the rotation will be applied
 *  before the movement.
 *
 */

url = require('url');
utils = require('../libs/utils');

//**********************************************************************
//*                                                                    *
//*                      Logical Implementations                       *
//*                                                                    *
//* This section of the module implements local functions that deal    *
//* with the data received by the server, and actually do the leg      *
//* work. The parsing and validating of the calls is done in the       *
//* "Server Hooks" section.                                            *
//*                                                                    *
//*                                                                    *
//**********************************************************************

function performMovementLogic(movement) {
    //We're assured at this point that movement is an object with values
    //for keys 'angle' and 'magnitude'
    
    console.log('Performing movement (' + movement.angle + ', ' + movement.magnitude + ')');
}

function performMovementsLogic(movements) {
    //movements is expected to be an array containing angle, magnitude pairs
    //with the magnitude in metres and the angle in radians.

    for (var i = 0; i < movements.length; i++) {
        var test = utils.checkObject(movements[i], 'angle', 'magnitude');
        if (test) {
            console.log(movements[i]);
            console.log('move/performMovement was given an array with incorrect members');
            console.log('the members were missing the "' + test + '" key.');
        }
        else {
            performMovementLogic(movements[i]);
        }
    }
}

//**********************************************************************
//*                                                                    *
//*                           Server Hooks                             *
//*                                                                    *
//* This section of the module defines functions that parse and        *
//* validate the data being sent to the server. These functions later  *
//* call the logical implementations.                                  *
//**********************************************************************

function performmovements(request, response) {
    var query = url.parse(request.url, true).query;
    var test = utils.checkObject(query, 'movements');
    if (test) {
        console.log('move/performmovement expected to have an object for key "' + test + '", but no object was found');
        response.writeHead(400, {"Content-Type": "text/plain"});
        response.write("Missing Argument: " + test);
        response.end();
    }
    else
    {
        try {
            performMovementsLogic(JSON.parse(query['movements']));
        }
        catch (err) {
            console.log('An error occured while parsing JSON: ' + err);
        }
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("Received");
        response.end();
    }
}

exports.performmovements = performmovements;
