const Role = require("../models/RoleModel");

exports.Roles = async (req, res) => {
  var body = req.body;
  console.log(body);
  if (Object.keys(body).length === 0 && body.constructor === Object) {
    res.status(400).send({ message: "data not proper formated..." });
  }
  // console.log("body = ", body)
  const roleDetails = new Role(body);
  await roleDetails
    .save()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
};
