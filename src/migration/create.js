const id = DataTypes => ({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
});

const timestamp = DataTypes => ({
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
});

const table = (DataTypes, fields = {}) => ({
  ...id(DataTypes),
  ...fields,
  ...timestamp(DataTypes),
});

module.exports = {
  id,
  timestamp,
  table,
};
