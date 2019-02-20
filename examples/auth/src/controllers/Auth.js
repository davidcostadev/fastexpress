const { authenticate } = require('../services/AuthServices');
const { Users } = require('../models');

const login = async (req, res) => {
  try {
    const {
      token,
      payload,
    } = await authenticate(Users)(req.body);

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
