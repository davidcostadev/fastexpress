const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const { Users } = require('../models');

const authenticate = Model => params =>
  Model.findOne({
    where: {
      email: params.email,
    },
    raw: true,
  }).then(user => {
    if (!user) {
      throw new Error('Authentication failed. User not found.');
    }

    if (!bcrypt.compareSync(params.password, user.password)) {
      throw new Error('Authentication failed. Wrong password.');
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      time: new Date(),
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: '6h',
    });

    return {
      token,
      payload,
    };
  });

const login = async (req, res) => {
  try {
    const { token, payload } = await authenticate(Users)(req.body);

    res.json({
      success: true,
      token,
      payload,
    });
  } catch (e) {
    res.status(401).json({
      success: false,
      message: e.message,
    });
  }
};

module.exports = {
  login,
};
