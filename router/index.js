var ejs = require("ejs");
var fs = require("fs");
const path = require("path");
let Queries = require("../Queries");
let fetcher = require("../Helpers/fetcher.js");
let query = require("../Helpers/query.js");
let mailer = require("../Helpers/mailer.js");
const Mutations = require("../Mutations");

module.exports = routes = {
  home: async function (data, res) {
    let fetchedData = await fetcher.get(Queries.getFlights());
    data = { ...data, flights: fetchedData };
    let html = ejs.render(fs.readFileSync("./views/home.ejs", "utf8"), {
      data: data.flights,
    });
    res.writeHead(200);
    res.write(html);
    res.end("\n");
  },
  reservation: async function (data, res) {
    id = data.query.id;
    let fetchedData = await fetcher.get(Queries.getFlight(id ? id : 1));
    data = { ...data, flight: fetchedData };
    let html = ejs.render(fs.readFileSync("./views/reservation.ejs", "utf8"), {
      data: data.flight,
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
  checkout: async function (data, res) {
    const body = data.body;
    //check if there is something to post
    if (data.method === "post" && body.includes("reservation")) {
      //just let the query method handle fetch
      data = await query(data, "post", "reservation");
      // await mailer()
      let createUser = await fetcher.post(Mutations.addUser(data.body));
    }
    if (data.method === "post" && body.includes("checkout")) {
      data = await query(data, "post", "checkout");
      console.log(data);
    }
    // this function called if the path is 'checkout'
    let html = ejs.render(fs.readFileSync("./views/checkout.ejs", "utf8"), {
      data: data.body,
    });
    res.writeHead(200);
    res.write(html);
    res.end("\n");
  },
  ticket: async function (data, res) {
    body = data.body;
    if (data.method === "post" && body.includes("confirm")) {
      data = await query(data, "post", "confirm");
      //if the user not exists, create it
      let userId = await fetcher.get(Queries.getUserByEmail(data.body.email));
      if (!userId.length) {
        let createUser = await fetcher.post(Mutations.addUser(data.body));
        userId = await fetcher.get(Queries.getLastUser());
        userId = userId[0].id;
      } else {
        userId = userId[0].id;
      }
      let tickets = data.body.num_pass;

      //get the flight info
      let flight = await fetcher.get(Queries.getFlight(data.body.id));
      data.body = {
        ...data.body,
        user_id: userId,
        tickets: +tickets + 1,
        flight: flight[0],
      };
      console.log(data);
      let createReservation = await fetcher.post(
        Mutations.addReservation(data.body)
      );
    }
    let html = ejs.render(fs.readFileSync("./views/ticket.ejs", "utf8"), {
      data: data.body,
    });
    await mailer(html);
    res.writeHead(200);
    res.write(html);
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
