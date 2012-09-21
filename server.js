/*
File: server.js
Author: Daniel Logan
Created: 09-21-2012
Description: Handles request deligation
*/

var http = require("http");
sys = require( 'sys' );
url = require("url");
http.createServer(function (request, response) {
    request.on("end", function () {
        _parsedUrl = url.parse(request.url, true);
        _pathName = _parsedUrl.pathname;
        _params = _parsedUrl.query;
        _paramKeys = getKeys(_params);

        response.writeHead(200, {
            'Content-Type': 'text/html'
        });

        if(_params['duck'] == 'butter'){
            response.end(debugOutput("<img src='http://bastardpiecetheater.com/wp-content/uploads/2009/02/clockwork_orange_got_milk_alex.jpg'/>"));
        }else{
            response.end(debugOutput("<blink>Duck Butter</blink>"));
        }

    });
}).listen(8080);

function getKeys(hashObj){
    var keys = [];
    for(var key in hashObj){
        if(hashObj.hasOwnProperty(key)){
            keys.push(key);
        }
    }
    return keys;
}

function debugOutput(out){
    out += "<br/><br/><br/>--Debug--<br/>Route: " + _pathName;
    if(_paramKeys.length > 0){
        for(var i=0; i < _paramKeys.length; i++){
            out += '<br/>' + _paramKeys[i] + ' : ' + _params[_paramKeys[i]];
        }
    }
    return out
}
