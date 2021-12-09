const http = require("http");
const url = require("url");
const PORT = process.env.PORT || 8080;
let routes = require('./router');
let Queries = require('./Queries');
let fetcher = require('./Helpers/fetcher.js');



const server = http.createServer(async function(req, res) {
  //console.log(req.url);
  let parsedURL = url.parse(req.url, true);
  let path = parsedURL.pathname;
  // parsedURL.pathname  parsedURL.query
  // standardize the requested url by removing any '/' at the start or end
  // '/folder/to/file/' becomes 'folder/to/file'
  path = path.replace(/^\/+|\/+$/g, "");
  let subPath = path.split('/')[1];
  // console.log(path);
  if (path == "") {
    path = "home";
  }else{
    path = path.split("/")[0]
  }
  let qs = parsedURL.query;
  let fetchedData = await fetcher.get(Queries.getFlights())
  let headers = req.headers;
  let method = req.method.toLowerCase();

  req.on("data", function() {
    console.log("got some data");
    //if no data is passed we don't see this message
    //but we still need the handler so the "end" function works.
  });
  req.on("end", function() {
    //request part is finished... we can send a response now
    console.log("send a response");

    //we will use the standardized version of the path
    let route =
      typeof routes[path] !== "undefined" ? routes[path] : routes["fourOfour"];
    let data = {
      path: path,
      url: parsedURL.pathname,
      query: qs,
      headers: headers,
      method: method,
      data: fetchedData,
    };
    //pass data incase we need info about the request
    //pass the response object because router is outside our scope
    route(data, res);
  });
});


server.listen(PORT, function() {
  console.log(`Listening on port ${PORT} `);
});

