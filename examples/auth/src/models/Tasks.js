module.exports = (sequelize, DataTypes) => {
  const Tasks = sequelize.define('Tasks', {
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  }, {});

  Tasks.associate = ({ Users }) => {
    Tasks.belongsTo(Users);
  };

  return Tasks;
};
