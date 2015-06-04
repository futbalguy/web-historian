// var path = require('path');
// var archive = require('../helpers/archive-helpers');
// // require more modules/folders here!

// exports.handleRequest = function (req, res) {
//   res.end(archive.paths.list);
// };


var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelper = require('./http-helpers.js');
var fs = require('fs');
// require more modules/folders here!
//
//
var indexPagePath = '/Users/HR10/2015-05-web-historian/web/public/index.html'

exports.handleRequest = function (req, res) {

var headers = httpHelper.headers;

if (req.method === 'GET') {
  var statusCode = 200;
  res.writeHead(statusCode, headers);
} else if (req.method === 'POST') {
  var statusCode = 201;

} else if (req.method === 'OPTIONS') {
  var statusCode = 200;
}


  var filePath = indexPagePath;
  console.log(filePath)
  var responseData;
  fs.readFile(filePath,'utf8',function(err,data) {
   res.end(data);
  });



    // console.dir(archive.paths.list)


};
