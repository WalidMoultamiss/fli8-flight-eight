let flight_list = {
  properties: {
    id: {
      type: "int",
    },
    airline_id: {
      type: "int",
    },
    plane_no: {
      type: "string",
    },
    departure_airport_id: {
      type: "int",
    },
    arrival_airport_id: {
      type: "int",
    },
    departure_time: {
      type: "int",
    },
    arrival_datetime: {
      type: "datetime",
    },
    arrival_datetime: {
      type: "datetime",
    },
    price: {
      type: "int",
    },
    seats: {
      type: "int",
    },
  },
};

let airlines_list = {
    properties: {
        id: {
            type: "int",
        },
        airlines: {
            type: "string",
        },
        logo_path: {
            type: "string",
        },
    },
};

let airports_list = {
    properties: {
        id: {
            type: "int",
        },
        airport: {
            type: "string",
        },
        location: {
            type: "string",
        },
    }
};

let booked_flight = {
    properties: {
        id: {
            type: "int",
        },
        flight_id: {
            type: "int",
        },
        name: {
            type: "string",
        },
        address: {
            type: "string",
        },
        contact: {
            type: "string",
        },
    }
}

let users = {
    properties: {
        id: {
            type: "int",
        },
        name: {
            type: "string",
        },
        doctor_id: {
            type: "string",
        },
        email: {
            type: "string",
        },
        password: {
            type: "string",
        },
        address: {
            type: "string",
        },
        contact: {
            type: "string",
        },
        type: {
            type: "int",
        },
    }
}



module.exports = queries = {
  getFlights: () =>`SELECT flight_list.*, airlines_list.airlines , airlines_list.logo_path ,airport_list.airport as departure_airport, (SELECT airport_list.airport from airport_list where airport_list.id = flight_list.arrival_airport_id) as arrival_airport, airport_list.location FROM flight_list, airlines_list, airport_list WHERE flight_list.airline_id = airlines_list.id and airport_list.id =flight_list.departure_airport_id`,
  getAirline: () => `SELECT id, airlines, logo_path FROM airlines_list`,
  getAirport: () => `SELECT id, airport, location FROM airport_list`,
  getLastUser: () => `SELECT id FROM users ORDER BY id DESC LIMIT 1`,
  getFlight: (id) =>`SELECT flight_list.*, airlines_list.airlines , airlines_list.logo_path ,airport_list.airport as departure_airport, (SELECT airport_list.airport from airport_list where airport_list.id = flight_list.arrival_airport_id) as arrival_airport, airport_list.location FROM flight_list, airlines_list, airport_list WHERE flight_list.airline_id = airlines_list.id and airport_list.id =flight_list.departure_airport_id and flight_list.id = ${id}`,
  getFlightFromAirlineName: (airline_name) =>`SELECT flight_list.*, airlines_list.airlines , airlines_list.logo_path FROM flight_list, airlines_list WHERE flight_list.airline_id = airlines_list.id AND airlines_list.airlines = '${airline_name}'`,
  getUser: (id) => "SELECT * FROM users WHERE id = " + id,
  getUserByEmail: (email) => `SELECT id FROM users WHERE email = '${email}'`,
};
