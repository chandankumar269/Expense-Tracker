const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });

  if (exists)
    return res.status(400).json({
      message: "User exists",
    });

  const salt = await bcrypt.genSalt(10);

  const hashed = await bcrypt.hash(
    password,
    salt
  );

  const user = await User.create({
    name,
    email,
    password: hashed,
  });

  res.json({
    token: generateToken(user._id),
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (
    user &&
    (await bcrypt.compare(
      password,
      user.password
    ))
  ) {
    res.json({
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({
      message: "Invalid Credentials",
    });
  }
};