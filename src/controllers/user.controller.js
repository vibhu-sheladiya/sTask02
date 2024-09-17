const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const scretKey = "csvscvsvsuwdvdfyd";
const moment = require("moment");


const register = async (req, res) => {
  try {
    const { email, name, password, confirmpass} = req.body;
 
    if (password !== confirmpass) {
      throw new Error("password does not match");
    }
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      throw new Error("user already existing this email");
    }
    const hashpassword = await bcrypt.hash(password, 8);
    
    const payload = {
      email,
      exp: moment().add(1, "days").unix(),
    };
    const token =await jwt.sign(payload, scretKey);
    const filter = {
      email,
      name,
      password: hashpassword,
    
      token,
    };
    const data = await User.create(filter);
    return res.status(200).json({ data: data, message: "created done" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("user not found");
    }

    const comparepasword =await bcrypt.compare(password, user.password);
    if (!comparepasword) {
      throw new Error("invalid password");
    }
    const payload = {
      email: user.email,
    };
    const token = await jwt.sign(payload, scretKey, {
      expiresIn: "10m",
    });
    user.token = token;
    const output = await user.save();
    res.status(200).json({
      data: output,
      message: "login is done",
      success: true,
      status: 200,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



module.exports = {
  register,

  login,

};