var ejs = require("ejs");
var fs = require("fs");
const path = require("path");

module.exports = routes = {
  home: function (data, res) {
    //arr of 10 flights
    const flights = [
      {
        id: 1,
        flight_number: "AA1234",
        origin: "SFO",
        destination: "LAX",
        departure_time: "2017-01-01T00:00:00.000Z",
        arrival_time: "2017-01-01T00:00:00.000Z",
        price: "100.00",
        airline: "American Airlines",
        logo:"https://www.artgomedia.com/wp-content/uploads/2013/01/american-airlines.jpg"
      },
      {
        id: 2,
        flight_number: "AA1235",
        origin: "SFO",
        destination: "LAX",
        departure_time: "2017-01-01T00:00:00.000Z",
        arrival_time: "2017-01-01T00:00:00.000Z",
        price: "100.00",
        airline: "Qatar airways",
        logo:"https://logo-marque.com/wp-content/uploads/2020/11/Qatar-Airways-Embleme.png"
      },
      {
        id: 3,
        flight_number: "AA1236",
        origin: "SFO",
        destination: "LAX",
        departure_time: "2017-01-01T00:00:00.000Z",
        arrival_time: "2017-01-01T00:00:00.000Z",
        price: "100.00",
        airline: "british airlines",
        logo:"https://cdn.freebiesupply.com/logos/thumbs/2x/british-airways-logo.png"
      },
      {
        id: 4,
        flight_number: "AA1237",
        origin: "SFO",
        destination: "LAX",
        departure_time: "2017-01-01T00:00:00.000Z",
        arrival_time: "2017-01-01T00:00:00.000Z",
        price: "100.00",
        airline: "American Airlines",
      },
      {
        id: 5,
        flight_number: "AA1238",
        origin: "SFO",
        destination: "LAX",
        departure_time: "2017-01-01T00:00:00.000Z",
        arrival_time: "2017-01-01T00:00:00.000Z",
        price: "100.00",
        airline: "American Airlines",
      },
    ];
    let html = ejs.render(fs.readFileSync("./views/home.ejs", "utf8"), {
      flights: flights
    });
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
