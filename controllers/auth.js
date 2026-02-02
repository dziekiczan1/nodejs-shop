const bcrypt = require("bcryptjs");
const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
  });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.redirect("/login");
      }
      const passwordMatch = bcrypt.compareSync(password, user.password);
      if (passwordMatch) {
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
      } else {
        return res.redirect("/login");
      }
    })
    .catch((err) => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  User.findOne({
    email: email,
  })
    .then((userDoc) => {
      if (userDoc) {
        return res.redirect("/signup");
      }
      const hashedPassword = bcrypt.hashSync(password, 12);
      const user = new User({
        email: email,
        password: hashedPassword,
        cart: { items: [] },
      });
      return user.save();
    })
    .then((result) => {
      if (!result) {
        return;
      }
      res.redirect("/login");
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
