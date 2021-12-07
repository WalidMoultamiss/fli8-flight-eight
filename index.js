// A BASIC Node server
// Routing Requests

const http = require("http");
const url = require("url");
const PORT = process.env.PORT || 8080;
var ejs = require('ejs');
var fs = require('fs');

const server = http.createServer(function(req, res) {
  //console.log(req.url);
  let parsedURL = url.parse(req.url, true);
  let path = parsedURL.pathname;
  // parsedURL.pathname  parsedURL.query
  // standardize the requested url by removing any '/' at the start or end
  // '/folder/to/file/' becomes 'folder/to/file'
  path = path.replace(/^\/+|\/+$/g, "");
  console.log(path);
  let qs = parsedURL.query;
  let headers = req.headers;
  let method = req.method.toLowerCase();

  req.on("data", function() {
    console.log("got some data");
    //if no data is passed we don't see this messagee
    //but we still need the handler so the "end" function works.
  });
  req.on("end", function() {
    //request part is finished... we can send a response now
    console.log("send a response");
    //we will use the standardized version of the path
    let route =
      typeof routes[path] !== "undefined" ? routes[path] : routes["notFound"];
    let data = {
      path: path,
      queryString: qs,
      headers: headers,
      method: method
    };
    //pass data incase we need info about the request
    //pass the response object because router is outside our scope
    route(data, res);
  });
});

server.listen(PORT, function() {
  console.log(`Listening on port ${PORT} `);
});

let routes = {
  home: function(data, res) {
    // this function called if the path is 'kenny'
    let people = ['geddy', 'neil', 'alex'];
    let payload = ejs.render(fs.readFileSync('./views/home.ejs', 'utf8') , {people: people});
    res.writeHead(200);
    res.write(payload);
    res.end("\n");
  },
  about: function(data, res) {

    // this function called if the path is 'about'
    let payload = ejs.render(fs.readFileSync('./views/about.ejs', 'utf8'),);
    res.writeHead(200);
    res.write(payload);
    res.end("\n");
  }
};