var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');
var request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  var path = exports.paths.list;
   fs.readFile(path,'utf8',function(err,sitesData) {
        if (err) return console.log(err);
        var sites;
        if (sitesData === '') {
          sites = [];
        } else {
          sites = sitesData.split('\n')
        }
        callback(sites);
      });
};

exports.isUrlInList = function(site, tCallback, fCallback){
  exports.readListOfUrls(function(sites) {
    if (sites.indexOf(site) !== -1) {
      tCallback(site, sites);
    } else {
      fCallback(site, sites);
    }
  });
};

exports.addUrlToList = function(site){
  exports.readListOfUrls(function(sites) {
            console.log('checking sitesbeforepushsite:' + sites + 'alldone');
       console.log('checking sitebeforepushsite:' + site + 'alldone');
    sites.push(site);
                console.log('checking sitesafterpushsite:' + sites + 'alldone');
    var sitesTxt = sites.join('\n') + '\n';
        console.log(sites);
    var path = exports.paths.list;
    fs.writeFile(path, sitesTxt, function(err) {
      if (err) return console.log(err);
    });
  });
};

exports.isURLArchived = function(site, tCallback, fCallback){
  var siteLoc = exports.paths.archivedSites + '/' + site;
  fs.readFile(siteLoc,'utf8',function(err,siteHTML) {
    if (err) {
      fCallback(site);
    } else {
      tCallback(site, siteHTML);
    }
  });
};

exports.downloadUrls = function(sites, callback){
  for (var i=0; i < sites.length; i++) {
    request('http://' + sites[i], function (error, response, body) {
      if (error) {
        console.log(error);
      } else if (!error && response.statusCode == 200) {
        console.log(body)
        callback(body);
      }
    });
  }
};
