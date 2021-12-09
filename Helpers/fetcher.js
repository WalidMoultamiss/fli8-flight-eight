var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "fli8",
  port: 4000,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = fetcher = {
  //Queries.getFlights()
  get: (query) => {
    return new Promise((resolve, reject) => {
      con.query(query, function (err, result) {
        if (err) throw err;
        resolve(result);
      });
    });
  },
};
