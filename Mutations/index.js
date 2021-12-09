module.exports = mutations = {
    // mutation to add a new user
    addUser: (user)=>`INSERT INTO users (username, password,doctor_id,contact,address) VALUES ('${user.username}','${user.password}','${user.doctor_id}','${user.contact}','${user.address}')`,
    addFlight: (flight)=>`INSERT INTO flights (airline_id, plane_no, departure_airport_id, arrival_airport_id, departure_datetime, arrival_datetime, seats, price, date_created) VALUES ('${flight.airline_id}','${flight.plane_no}','${flight.departure_airport_id}','${flight.arrival_airport_id}','${flight.departure_datetime}','${flight.arrival_datetime}','${flight.seats}','${flight.price}','${flight.date_created}')`,
}