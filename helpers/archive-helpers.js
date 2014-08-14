var fs = require('fs');
var path = require('path');
var _ = require('underscore');

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
exports.returnWebsite = function(url){
  var thePath = '/Users/HR10/Code/MichaelLam/2014-07-web-historian/archives/sites/'
  thePath+=url;
  return fs.readFileSync(thePath,'utf-8');
}

exports.readListOfUrls = function(){
};

exports.isUrlInList = function(url1,localurl){
  return  url1.indexOf(localurl.slice(1))!==-1
};

exports.addUrlToList = function(url1,localurl){
  var newfile = url1;
  console.log('url1',url1);
  newfile += localurl.slice(1) + "\n"
  fs.writeFileSync(exports.paths.list, newfile);
};

exports.isURLArchived = function(){
};

exports.downloadUrls = function(){
};
