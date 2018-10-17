'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

const { table } = require('./create');

const createTable = (name, callback, then = () => {}) => (queryInterface, DataTypes) => queryInterface.createTable(name, _extends({}, table(DataTypes, _extends({}, callback(DataTypes))))).then(() => then(queryInterface, DataTypes));

const dropTable = name => queryInterface => queryInterface.dropTable(name);

const addConstraint = (queryInterface, tableCurrent, { tableName, field, name }) => queryInterface.addConstraint(tableCurrent, [field], {
  type: 'foreign key',
  name,
  references: {
    table: tableName,
    field: 'id'
  },
  onDelete: 'cascade',
  onUpdate: 'no action'
});

module.exports = {
  dropTable,
  createTable,
  addConstraint
};