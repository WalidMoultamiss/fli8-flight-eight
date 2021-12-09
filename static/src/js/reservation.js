//add passenger inputs
var passenger = document.getElementById("passenger_form");

const addPassenger = () => {
  var numOfpassengers = document.getElementById("numOfpassengers").value;
  let html = [];
  for (var i = 0; i < numOfpassengers; i++) {
    html.push(`
<div class="flex w-full gap-3 p-3 rounded-md bg-blue-100 relative">
                    <button class="text-xs text-white rounded-full absolute top-1 right-1 px-3 p-1 bg-red-400">
                        remove
                    </button>
                    <div class="w-full">
                        <label for="passenger">full name</label>
                        <input type="text" name="passenger" id="passenger" class="w-full p-2 border-2 border-gray-400 rounded-lg">
                    </div>
                    <div class="w-full">
                        <label for="passenger">Passport</label>
                        <input type="text" name="passport" id="passenger" class="w-full p-2 border-2 border-gray-400 rounded-lg">
                    </div>
                    <div class="w-full">
                        <label for="passenger">email</label>
                        <input type="email" name="email_pass" id="passenger" class="w-full p-2 border-2 border-gray-400 rounded-lg">
                    </div>
                </div>
`);
  }
  passenger.innerHTML += html.join("");
};
