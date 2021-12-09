var ejs = require("ejs");
var fs = require("fs");
const path = require("path");
let Queries = require('../Queries');
let fetcher = require('../Helpers/fetcher.js');

module.exports = routes = {
  home: async function (data, res) {
    let fetchedData = await fetcher.get(Queries.getFlights())
    data = {...data, flights: fetchedData}
    let html = ejs.render(fs.readFileSync("./views/home.ejs", "utf8"), {data:data.flights});
    res.writeHead(200);
    res.write(html);
    res.end("\n");
  },
  reservation:async function (data, res) {
      id = data.query.id;
      let fetchedData = await fetcher.get(Queries.getFlight(id ? id : 1))
      data = {...data, flight: fetchedData}
      let html = ejs.render(fs.readFileSync("./views/reservation.ejs", "utf8"), {data:data.flight});
      res.writeHead(200);
      res.write(html);
      res.end("\n");
    
  },
  static: function (data, res) {
    let static = fs.readFileSync(path.join(__dirname + "/../" + data.url));
    res.writeHead(200);
    res.write(static);
    res.end("\n");
  },
  about: function (data, res) {
    // this function called if the path is 'about'
    let html = ejs.render(fs.readFileSync("./views/about.ejs", "utf8"));
    res.writeHead(200);
    res.write(html);
    res.end("\n");
  },
  fourOfour: function (data, res) {
    // this function called if there is no path
    let payload = ejs.render(fs.readFileSync("./views/fourOfour.ejs", "utf8"));
    res.writeHead(404);
    res.write(payload);
    res.end("\n");
  },
};
