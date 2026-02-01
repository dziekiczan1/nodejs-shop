const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  User.findById("697c6dbc2698911e08e86833")
    .then((user) => {
      req.session.isLoggedIn = true;
      req.session.user = {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        cart: user.cart,
      };
      req.session.save((err) => {
        console.log(err);
        res.redirect("/");
      });
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
