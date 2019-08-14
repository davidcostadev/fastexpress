const { table } = require('./create');

const createTable = (name, callback, then = () => {}) => (queryInterface, DataTypes) =>
  queryInterface
    .createTable(name, {
      ...table(DataTypes, {
        ...callback(DataTypes),
      }),
    })
    .then(() => then(queryInterface, DataTypes));

const dropTable = name => queryInterface => queryInterface.dropTable(name);

const addConstraint = (queryInterface, tableCurrent, { tableName, field, name }) =>
  queryInterface.addConstraint(tableCurrent, [field], {
    type: 'foreign key',
    name,
    references: {
      table: tableName,
      field: 'id',
    },
    onDelete: 'cascade',
    onUpdate: 'no action',
  });

module.exports = {
  dropTable,
  createTable,
  addConstraint,
};
