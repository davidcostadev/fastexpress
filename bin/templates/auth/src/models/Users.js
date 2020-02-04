const { cryptPassword } = require('fastexpress');

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {},
  );
  // Users.associate = ({ Resource }) => {
  //   Users.hasMany(Resource);
  // };

  Users.beforeCreate(cryptPassword(8));
  Users.beforeUpdate(cryptPassword(8));

  return Users;
};