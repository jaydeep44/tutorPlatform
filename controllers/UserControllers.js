const User = require("../models/UserModel");
const Roles = require("../models/RoleModel");
const bcrypt = require("bcrypt");

exports.CreateUser = (req, res) => {
  const body = req.body;
  console.log(req.body.roleId, "roleId");
  // if (Object.keys(body).length === 0 && body.constructor === Object) {
  //   res.status(400).send({ message: "Data Not Proper Formated..." });
  // }
  Roles.findOne({ roleType: req.body.roleId })
    .then((data) => {
      console.log(data, "data");
      body.roleId = data._id;
      const newUser = new User(body);
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(newUser.password, salt);
      newUser.password = hash;
      newUser
        .save()
        .then((result) => {
          res.status(200).send(result);
        })
        .catch((err) => {
          res.status(400).send({
            message: "please Insert Unique Data",
            SubError: err.message,
          });
        });
    })
    .catch((err) => {
      res
        .status(400)
        .send({ message: "Role does not exist..", SubError: err.message });
    });
};
exports.userDetail = (req, res) => {
  const id = req.params.id;
  if (id) {
    User.findOne({ _id: id })
      .populate([{ path: "roleId", select: "roleType isActive _id" }])
      .populate([{ path: "courses" }])

      .then((user) => {
        if (!user) {
          return res.status(404).send();
        }
        res.send(user);
      })
      .catch((err) => {
        res.send(err);
      });
  } else {
    User.find()
      .populate({ path: "roleId", select: "roleType isActive _id" })
      .populate([{ path: "courses" }])

      .then((response) => {
        res.status(200).send(response);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  }
};
exports.UpdateUser = async (req, res) => {
  const id = [];
  // const salt = bcrypt.genSaltSync(10);
  // const hash = bcrypt.hashSync(req.body.password, salt);

  const role = await Roles.findOne({ roleType: req.body.roleId }).then(
    (data) => {
      id.push(data._id);
      console.log(data);
    }
  );
  console.log(id, "ids");
  User.findOneAndUpdate(
    { _id: req.params.id },
    {
      roleId: id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
    }
  )
    .then((result) => {
      res.status(200).json({
        updated_user: "User Updated successfully",
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: err,
      });
    });
};

exports.DeleteUser = async (req, res) => {
  let user = await User.findById(req.params.id);
  console.log(user, "user");
  if (!user) {
    return res.status(500).json({
      success: false,
      message: "user was not found",
    });
  }
  try {
    await user.remove();
    res.status(201).json({
      success: true,
      message: "user deleted",
    });
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
};
