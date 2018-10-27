import { table } from '../../src/migration/create';

describe('tableTypes', () => {
  describe('table should works', () => {
    let DataTypes;

    beforeEach(() => {
      DataTypes = {
        STRING: 'STRING',
        INTEGER: 'INTEGER',
        DATE: 'DATE',
      };
    });

    it('with defaults props', () => {
      const result = table(DataTypes);

      expect(result).toEqual({
        id: {
          type: 'INTEGER',
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        updatedAt: {
          type: 'DATE',
          allowNull: false,
        },
        createdAt: {
          type: 'DATE',
          allowNull: false,
        },
      });
    });

    it('with props', () => {
      const result = table(DataTypes, {
        name: {
          type: DataTypes.STRING,
        },
      });

      expect(result).toEqual({
        id: {
          type: 'INTEGER',
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: 'STRING',
        },
        updatedAt: {
          type: 'DATE',
          allowNull: false,
        },
        createdAt: {
          type: 'DATE',
          allowNull: false,
        },
      });

      // console.log(queryInterface.createTable.mock.calls[0])
    });
  });
});
