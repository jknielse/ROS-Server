 /*     utils.js
  *
  * utils.js defines some useful functions that aren't
  * associated with any one partucular part of the code.
  *
  */

//checkObject takes an object and an arbitrary number of
//strings. If the object has no defined object for each
//of the strings as keys, it will return the key that 
//didn't map to an object.
function checkObject (object) {
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            if (!(object[arguments[i]])) {
                return arguments[i];
            }
        }
        return null;
    }
    else {
        return null;
    }
}

exports.checkObject = checkObject;
