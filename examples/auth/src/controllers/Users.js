const { createController } = require('fastexpress');
const UserService = require('../services/UserServices');

module.exports = createController(UserService);
