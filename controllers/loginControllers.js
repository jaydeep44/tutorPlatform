const User = require("../models/UserModel");
const Roles = require("../models/RoleModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = (req, res, next) => {
  let role = [];
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(400).json({
          message: "user name not found",
        });
      }
      const data = Roles.find({ _id: user[0].roleId }).then((data) => {
        // role.push(data[0]);
        console.log(data[0].roleType);
        role.push({
          roleType: data[0].roleType,
          _id: data[0]._id,
        });
      });

      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (!result) {
          return res.status(400).json({
            message: "password is incorrect",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              _id: user[0]._id,
            },
            "this is dummy text",
            {
              expiresIn: "24h",
            }
          );
          res.status(200).json({
            _id: user[0]._id,
            firstName: user[0].firstName,
            lastName: user[0].lastName,
            email: user[0].email,
            phone: user[0].phone,
            token: token,
            role: role,
          });
        }
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: err,
      });
    });
};
