/*
Diffbot v1.1
Author: Craig Cooke
Updated: John Davi
*/

/**
Constructor: Create an instance of the Diffbot class.
Parameters:
@token: Your Diffbot API token
**/
export function Diffbot(token) {
    var apiUri = "https://api.diffbot.com/v3/"; // Base url for all requests

    // Utility to wrap private helper functions
    var utility = {
        callAPI: function callAPI(endpoint, params, successCallback, errorCallback) {
            var absoluteUrl = apiUri + endpoint;

            if (endpoint.indexOf('http') == 0) {
                absoluteUrl = endpoint;
            }

            // See if we have a callback function specified
            if (!errorCallback) errorCallback = function (r) { };

            // Append token to parameters
            params.token = token;

            // Split the callback into success or failure.
            var callback = function (r) {
                if (r.error !== undefined) {
                    errorCallback(r);
                }
                else {
                    successCallback(r);
                }
            }

            // Make the ajax request
            console.log(JSONP);
            JSONP.get(absoluteUrl, params, callback);
        },
        extend: function extend(object1, object2) {
            // Append any properties set in object two onto object1
            for (var prop in object2) {
                object1[prop] = object2[prop];
            }

            return object1;
        }
    };

    return {
        /*
          Call the Article API
          params:
              @args: An object containing parameters to supply with the API call
              @onSuccess: A callback function which is invoked as a result of a successful lookup. Signature: onSuccess(response);
              @onError: A callback function which is invoked as a result of an error occuring during a lookup: Signature: onError(response);
        */
        article: {
            get: function get(args, onSuccess, onError) {
                // Define default notArguments which will be overridden by properties defined in args
                var notArguments = utility.extend({
                    url: null,
                    fields: "*"
                }, args);

                // Make the API call
                utility.callAPI("article", notArguments, onSuccess, onError);
            }
        },
        /*
          Call the Discussion API
          params:
              @args: An object containing parameters to supply with the API call
              @onSuccess: A callback function which is invoked as a result of a successful lookup. Signature: onSuccess(response);
              @onError: A callback function which is invoked as a result of an error occuring during a lookup: Signature: onError(response);
        */
        discussion: {
            extract: function extract(args, onSuccess, onError) {
                // Define default notArguments which will be overridden by properties defined in args
                var notArguments = utility.extend({
                    url: null,
                    fields: "*"
                }, args);

                notArguments.format = "json"; // only support JSON?

                // Make the API call
                utility.callAPI("discussion", notArguments, onSuccess, onError);
            }
        },
        /*
          Call the Product API
          params:
              @args: An object containing parameters to supply with the API call
              @onSuccess: A callback function which is invoked as a result of a successful lookup. Signature: onSuccess(response);
              @onError: A callback function which is invoked as a result of an error occuring during a lookup: Signature: onError(response);
        */
        product: {
            get: function get(args, onSuccess, onError) {
                // Define default notArguments which will be overridden by properties defined in args
                var notArguments = utility.extend({
                    url: null,
                    fields: "*",
                }, args);

                // Make the API call
                utility.callAPI("product", notArguments, onSuccess, onError);
            }
        },
        /*
          Call the Image API
          params:
              @args: An object containing parameters to supply with the API call
              @onSuccess: A callback function which is invoked as a result of a successful lookup. Signature: onSuccess(response);
              @onError: A callback function which is invoked as a result of an error occuring during a lookup: Signature: onError(response);
        */
        image: {
            get: function get(args, onSuccess, onError) {
                // Define default notArguments which will be overridden by properties defined in args
                var notArguments = utility.extend({
                    url: null,
                    fields: "*"
                }, args);

                // Make the API call
                utility.callAPI("image", notArguments, onSuccess, onError);
            }
        },
        /*
          Call the Video API
          params:
              @args: An object containing parameters to supply with the API call
              @onSuccess: A callback function which is invoked as a result of a successful lookup. Signature: onSuccess(response);
              @onError: A callback function which is invoked as a result of an error occuring during a lookup: Signature: onError(response);
        */
        video: {
            get: function get(args, onSuccess, onError) {
                // Define default notArguments which will be overridden by properties defined in args
                var notArguments = utility.extend({
                    url: null,
                    fields: "*"
                }, args);

                // Make the API call
                utility.callAPI("video", notArguments, onSuccess, onError);
            }
        },
        /*
          Call the Analyze API
          params:
              @args: An object containing parameters to supply with the API call
              @onSuccess: A callback function which is invoked as a result of a successful lookup. Signature: onSuccess(response);
              @onError: A callback function which is invoked as a result of an error occuring during a lookup: Signature: onError(response);
        */

        analyze: {
            get: function get(args, onSuccess, onError) {
                // Define default notArguments which will be overridden by properties defined in args
                var notArguments = utility.extend({
                    url: null,
                    fields: "*"
                }, args);

                // Make the API call
                utility.callAPI("analyze", notArguments, onSuccess, onError);
            }
        },
        /*
            Exposes access to any of the DiffBot APIs
            params:
                @absoluteUrl: The absolute url of the API endpoint to call
                @args: An object containing parameters to supply with the API call
                @onSuccess: A callback function which is invoked as a result of a successful lookup. Signature: onSuccess(response);
                @onError: A callback function which is invoked as a result of an error occuring during a lookup: Signature: onError(response);
        */
        call: function (absoluteUrl, args, onSuccess, onError) {
            // Make the API call
            utility.callAPI(absoluteUrl, args, onSuccess, onError);
        }
    };
}


/* JSON Library created by Douglas Crockford for backwards compatibility */
var JSON;
if (!JSON) {
    JSON = {};
}

(function () {
    'use strict';

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return isFinite(this.valueOf())
                ? this.getUTCFullYear() + '-' +
                    f(this.getUTCMonth() + 1) + '-' +
                    f(this.getUTCDate()) + 'T' +
                    f(this.getUTCHours()) + ':' +
                    f(this.getUTCMinutes()) + ':' +
                    f(this.getUTCSeconds()) + 'Z'
                : null;
        };

        String.prototype.toJSON =
            Number.prototype.toJSON =
            Boolean.prototype.toJSON = function (key) {
                return this.valueOf();
            };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"': '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

        // If the string contains no control characters, no quote characters, and no
        // backslash characters, then we can safely slap some quotes around it.
        // Otherwise we must also replace the offending characters with safe escape
        // sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string'
                ? c
                : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }


    function str(key, holder) {

        // Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

        // If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

        // If we were called with a replacer function, then call the replacer to
        // obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

        // What happens next depends on the value's type.

        switch (typeof value) {
            case 'string':
                return quote(value);

            case 'number':

                // JSON numbers must be finite. Encode non-finite numbers as null.

                return isFinite(value) ? String(value) : 'null';

            case 'boolean':
            case 'null':

                // If the value is a boolean or null, convert it to a string. Note:
                // typeof null does not produce 'null'. The case is included here in
                // the remote chance that this gets fixed someday.

                return String(value);

                // If the type is 'object', we might be dealing with an object or an array or
                // null.

            case 'object':

                // Due to a specification blunder in ECMAScript, typeof null is 'object',
                // so watch out for that case.

                if (!value) {
                    return 'null';
                }

                // Make an array to hold the partial results of stringifying this object value.

                gap += indent;
                partial = [];

                // Is the value an array?

                if (Object.prototype.toString.apply(value) === '[object Array]') {

                    // The value is an array. Stringify every element. Use null as a placeholder
                    // for non-JSON values.

                    length = value.length;
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || 'null';
                    }

                    // Join all of the elements together, separated with commas, and wrap them in
                    // brackets.

                    v = partial.length === 0
                        ? '[]'
                        : gap
                        ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                        : '[' + partial.join(',') + ']';
                    gap = mind;
                    return v;
                }

                // If the replacer is an array, use it to select the members to be stringified.

                if (rep && typeof rep === 'object') {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        if (typeof rep[i] === 'string') {
                            k = rep[i];
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                } else {

                    // Otherwise, iterate through all of the keys in the object.

                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                }

                // Join all of the member texts together, separated with commas,
                // and wrap them in braces.

                v = partial.length === 0
                    ? '{}'
                    : gap
                    ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                    : '{' + partial.join(',') + '}';
                gap = mind;
                return v;
        }
    }

    // If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

            // The stringify method takes a value and an optional replacer, and an optional
            // space parameter, and returns a JSON text. The replacer can be a function
            // that can replace values, or an array of strings that will select the keys.
            // A default replacer method can be provided. Use of the space parameter can
            // produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

            // If the space parameter is a number, make an indent string containing that
            // many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

                // If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

            // If there is a replacer, it must be a function or an array.
            // Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

            // Make a fake root object containing our value under the key of ''.
            // Return the result of stringifying the value.

            return str('', { '': value });
        };
    }

    // If the JSON object does not yet have a parse method, give it one.
    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

            // The parse method takes a text and an optional reviver function, and returns
            // a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

                // The walk method is used to recursively walk the resulting structure so
                // that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


            // Parsing happens in four stages. In the first stage, we replace certain
            // Unicode characters with escape sequences. JavaScript handles many characters
            // incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

            // In the second stage, we run the text against regular expressions that look
            // for non-JSON patterns. We are especially concerned with '()' and 'new'
            // because they can cause invocation, and '=' because it can cause mutation.
            // But just to be safe, we want to reject all unexpected forms.

            // We split the second stage into 4 regexp operations in order to work around
            // crippling inefficiencies in IE's and Safari's regexp engines. First we
            // replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
            // replace all simple value tokens with ']' characters. Third, we delete all
            // open brackets that follow a colon or comma or that begin the text. Finally,
            // we look to see that the remaining characters are only whitespace or ']' or
            // ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/
                    .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

                // In the third stage we use the eval function to compile the text into a
                // JavaScript structure. The '{' operator is subject to a syntactic ambiguity
                // in JavaScript: it can begin a block or an object literal. We wrap the text
                // in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

                // In the optional fourth stage, we recursively walk the new structure, passing
                // each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function'
                    ? walk({ '': j }, '')
                    : j;
            }

            // If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());

/**
     * simple JSONP support
     *
     * JSONP.get('https://api.github.com/gists/1431613', function (data) { console.log(data); });
     * JSONP.get('https://api.github.com/gists/1431613', {}, function (data) { console.log(data); });
     *
     * gist: https://gist.github.com/gists/1431613
    */
var JSONP = (function (document) {
    var requests = 0,
        callbacks = {};

    return {
        /**
         * makes a JSONP request
         *
         * @param {String} src
         * @param {Object} data
         * @param {Function} callback
         */
        get: function (src, data, callback) {
            // check if data was passed
            if (!arguments[2]) {
                callback = arguments[1];
                data = {};
            }

            // determine if there already are params
            src += (src.indexOf('?') + 1 ? '&' : '?');

            var head = document.getElementsByTagName('head')[0],
                script = document.createElement('script'),
                params = [],
                requestId = requests,
                param;

            // increment the requests
            requests++;
            console.log(data);
            // create external callback name
            // data.callback = 'JSONP.callbacks.request_' + requestId;

            // set callback function
            // callbacks['request_' + requestId] = function (data) {
            //     // clean up
            //     head.removeChild(script);
            //     delete callbacks['request_' + requestId];
            //
            //     // fire callback
            //     callback(data);
            // };

            // traverse data
            for (param in data) {
                params.push(param + '=' + encodeURIComponent(data[param]));
            }

            // generate params
            src += params.join('&');

            // set script attributes
            script.type = 'text/javascript';
            script.src = src;

            // add to the DOM
            head.appendChild(script);
        },

        /**
         * keeps a public reference of the callbacks object
         */
        callbacks: callbacks
    };
}(document));
