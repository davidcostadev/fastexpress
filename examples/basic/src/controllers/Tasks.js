const { createController } = require('fastexpress');
const TaskService = require('../services/TaskServices');

module.exports = createController(TaskService);
