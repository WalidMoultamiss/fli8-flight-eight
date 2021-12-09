module.exports = query = function (data, method, action) {
  /*
    this function is used to check the method
    and the action of the request
    and also prepare the data and use it as objects
    we need the data to be an object
    and the method to be a string
    and the action to be a string
*/

  if (data.method == method) {
    //check if there is a reservation
    if (data.body.includes(action)) {
      //now the body to an object
      let body = {};
      data.body.split("&").forEach((element) => {
        let key = element.split("=")[0];
        let value = element.split("=")[1].replace(/\+/g, " ");
        value = decodeURIComponent(value);
        body[key] = value;
      });
      //now we have the body
      return { ...data, body: body };
    }else{
        return false;
    }
  }
};
