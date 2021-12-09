module.exports = queries = {
        getFlights:()=>`SELECT flight_list.*, airlines_list.airlines , airlines_list.logo_path FROM flight_list, airlines_list WHERE flight_list.airline_id = airlines_list.id`,
        getFlight:(id)=>`SELECT flight_list.*, airlines_list.airlines , airlines_list.logo_path FROM flight_list, airlines_list WHERE flight_list.airline_id = airlines_list.id AND flight_list.id = ${id}`,
        getFlightFromAirlineName:(airline_name)=>`SELECT flight_list.*, airlines_list.airlines , airlines_list.logo_path FROM flight_list, airlines_list WHERE flight_list.airline_id = airlines_list.id AND airlines_list.airlines = '${airline_name}'`,
        getUser:(id)=>'SELECT * FROM users WHERE id = '+id,
}