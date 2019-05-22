const { createController } = require('../../../../src');
const TaskService = require('../services/TaskServices');

module.exports = createController(TaskService);
