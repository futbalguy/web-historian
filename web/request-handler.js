// var path = require('path');
// var archive = require('../helpers/archive-helpers');
// // require more modules/folders here!

// exports.handleRequest = function (req, res) {
//   res.end(archive.paths.list);
// };

var url = require('url')
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

  var parsedURL = url.parse(req.url, true);
  var pathName = parsedURL.pathname;
  var site = pathName.slice(1)


  if (req.method === 'GET') {
    //header
    var statusCode = 200;
    res.writeHead(statusCode, headers);

    //body
    if (!site) {
      var filePath = archive.paths.siteAssets + '/index.html';
      console.log(filePath)
      fs.readFile(filePath,'utf8',function(err,data) {
       res.end(data);
      });
    } else {

      var siteLoc = archive.paths.archivedSites + '/' + site;

      fs.readFile(siteLoc,'utf8',function(err,siteHTML) {
        if (err) {
          statusCode = 404;
          res.writeHead(statusCode, headers);
          res.end('Not found');
        } else {
          res.end(siteHTML);
        }
      });
    }

  } else if (req.method === 'POST') {
    //header
    var statusCode = 302;
    res.writeHead(statusCode, headers);

    //console.log('req: ',req)

    var postData = '';
    req.on('data', function(item){
      postData += item;
    });

    req.on('end', function(){
      var site = postData.slice(4);
      var sitesPath = archive.paths.list;
      fs.readFile(sitesPath,'utf8',function(err,sitesData) {
        if (err) return console.log(err);
        sitesData += site + '\n';
        fs.writeFile(sitesPath, sitesData, function(err) {
          if (err) return console.log(err);
          res.end('');
        });
      });
    })

    //body
  } else if (req.method === 'OPTIONS') {
    var statusCode = 200;
    res.writeHead(statusCode, headers);
  }


};


