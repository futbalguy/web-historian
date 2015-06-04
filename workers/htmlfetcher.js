// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.
var url = require('url')
var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');

var tCallback = function() {
  // do nothing
};

var fCallback = function(site) {
  var sites = [site];
  archive.downloadUrls(sites, function(htmlData) {
    fs.writeFile(archive.paths.archivedSites + '/' + site, htmlData, function(err) {
      if (err) return console.log(err);
    });
  });
};

archive.readListOfUrls(function(sites){
  for (var i=0; i < sites.length; i++) {
    if (sites[i] !== '') {
    archive.isURLArchived(sites[i], tCallback, fCallback)
  }
}
});
