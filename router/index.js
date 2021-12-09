var ejs = require("ejs");
var fs = require("fs");
const path = require("path");

module.exports = routes = {
  home: function (data, res) {
    let html = ejs.render(fs.readFileSync("./views/home.ejs", "utf8"), {data:data.data});
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
