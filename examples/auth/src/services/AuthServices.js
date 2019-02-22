const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getUserByEmail = Model => email => Model.findOne({ where: { email } });

const authenticate = Model => params => Model.findOne({
  where: {
    email: params.email,
  },
  raw: true,
}).then((user) => {
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

  const token = jwt.sign(payload, 'secretkey', {
    expiresIn: '6h',
  });

  return {
    token,
    payload,
  };
});

module.exports = {
  getUserByEmail,
  authenticate,
};
