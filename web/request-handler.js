var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelper = require('./http-helpers.js');
var fs = require('fs')

// require more modules/folders here!
var url1 = fs.readFileSync('/Users/HR10/Code/MichaelLam/2014-07-web-historian/archives/sites.txt','utf8')
exports.handleRequest = function (req, res) {
  var statusCode = 200;
  console.log(req.method);
  if(req.method=== "GET"){
     if(req.url === "/"){
      fs.readFile('/Users/HR10/Code/MichaelLam/2014-07-web-historian/web/public/index.html','utf8',function(err,data){
        if(err){
          throw err;
        }
        res.writeHead(statusCode,httpHelper.headers);
        res.end(data);
      });
    }else if(archive.isUrlInList(url1,req.url)){
      res.writeHead(statusCode,httpHelper.headers);
      res.end(archive.returnWebsite(req.url));
    } else {
      res.writeHead(404,httpHelper.headers);
      res.end();
    }
  }


  if(req.method === "POST"){
    var loadingPage = fs.readFileSync('/Users/HR10/Code/MichaelLam/2014-07-web-historian/web/public/loading.html','utf8')
    var url2 = fs.readFileSync(archive.paths.list, 'utf8');
    res.writeHead(302,httpHelper.headers);

      req.on('data',function(chunk){
        chunk = chunk.toString();
        if(archive.isUrlInList(url2,chunk.slice(3)) === false){
          archive.addUrlToList(url2,chunk.slice(3));
          console.log("hi")
          res.end(loadingPage);
        }
      });

    //check if the url is "/"
      //if it is, call archive.isurlInList and pass in postdata as req.url
  }


  //res.end(archive.paths.list);
};
