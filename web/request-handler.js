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
      fs.readFile(filePath,'utf8',function(err,data) {
       res.end(data);
      });
    } else {
      var tCallback = function(site, siteHTML){
        res.end(siteHTML);
      };
      var fCallback = function(site) {
        statusCode = 404;
        res.writeHead(statusCode, headers);
        res.end('Not found');
      };
      archive.isURLArchived(site, tCallback, fCallback);
    }

  } else if (req.method === 'POST') {

    var postData = '';
    req.on('data', function(item){
      postData += item;
    });

    req.on('end', function(){

      site = postData.slice(4);

      var tCallback = function(site,siteHTML) {
        var statusCode = 302;
        headers['Location'] = '/' + site;
        res.writeHead(statusCode, headers);
        res.end('');
      };
      var fCallback = function(site) {
        console.log('location: ',site);

        var statusCode = 302;
        delete headers['Location'];
        res.writeHead(statusCode, headers);
        var filePath = archive.paths.siteAssets + '/loading.html';
        fs.readFile(filePath,'utf8',function(err,data) {
         res.end(data);
        });
        // checking if URL in the sites.txt file
        var trueCB = function() {
          // does nothing; waiting for worker to handle this entry
        };
        var falseCB = function(site) {
          archive.addUrlToList(site);
        };
        archive.isUrlInList(site, trueCB, falseCB);

      }
      archive.isURLArchived(site, tCallback, fCallback);
    });


  } else if (req.method === 'OPTIONS') {
    var statusCode = 200;
    res.writeHead(statusCode, headers);
  }


};


