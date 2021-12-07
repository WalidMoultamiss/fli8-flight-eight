
var ejs = require('ejs');
var fs = require('fs');


module.exports = routes = {
    home: function(data, res) {
      let people = ['geddy', 'neil', 'alex'];
      let payload = ejs.render(fs.readFileSync('./views/home.ejs', 'utf8') , {people: people});
      res.writeHead(200);
      res.write(payload);
      res.end("\n");
    },

    about: function(data, res) {
      // this function called if the path is 'about'
      let payload = ejs.render(fs.readFileSync('./views/about.ejs', 'utf8'));
      res.writeHead(200);
      res.write(payload);
      res.end("\n");
    },
    fourOfour: function(data, res) {
      // this function called if there is no path
      let payload = ejs.render(fs.readFileSync('./views/fourOfour.ejs', 'utf8'));
      res.writeHead(404);
      res.write(payload);
      res.end("\n");
    }
  };
