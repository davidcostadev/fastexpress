import {
  addConstraint,
  createTable,
  dropTable,
} from '../../src/migration/helper';

describe('migrationsHelpers', () => {
  describe('addConstraint should', () => {
    it('works', () => {
      const queryInterface = {
        addConstraint: jest.fn(),
      };

      addConstraint(queryInterface, 'TableOne', {
        tableName: 'tableName',
        field: 'field',
        name: 'fk_name',
      });

      expect(queryInterface.addConstraint).toBeCalled();
      expect(queryInterface.addConstraint.mock.calls).toEqual([
        [
          'TableOne',
          ['field'],
          {
            type: 'foreign key',
            name: 'fk_name',
            references: {
              table: 'tableName',
              field: 'id',
            },
            onDelete: 'cascade',
            onUpdate: 'no action',
          },
        ],
      ]);
    });
  });

  describe('createTable should', () => {
    let queryInterface;
    let DataTypesMock;

    beforeEach(() => {
      queryInterface = {
        createTable: jest.fn().mockResolvedValue(true),
      };

      DataTypesMock = {
        STRING: 'STRING',
        INTEGER: 'INTEGER',
        DATE: 'DATE',
      };
    });

    it('works with default props', () => {
      createTable('Table', DataTypes => ({
        name: {
          type: DataTypes.STRING,
        },
      }))(queryInterface, DataTypesMock);

      expect(queryInterface.createTable).toBeCalled();
      expect(queryInterface.createTable.mock.calls).toEqual([
        [
          'Table',
          {
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
          },
        ],
      ]);

      // console.log(queryInterface.createTable.mock.calls[0])
    });

    it('works with then', async () => {
      const then = jest.fn();

      await createTable('Table', () => ({}), then)(queryInterface, DataTypesMock);

      expect(then.mock.calls).toEqual([[queryInterface, DataTypesMock]]);
    });
  });

  describe('dropTable should', () => {
    it('works', () => {
      const queryInterface = {
        dropTable: jest.fn(),
      };

      dropTable('Table')(queryInterface);

      expect(queryInterface.dropTable).toBeCalled();
      expect(queryInterface.dropTable.mock.calls).toEqual([['Table']]);
    });
  });
});
