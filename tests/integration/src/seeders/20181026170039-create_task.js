module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Tasks', [
      {
        name: 'First Task',
        completed: true,
        createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
        name: 'Second Task',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface) => {
    queryInterface.bulkDelete('Tasks');
  }
};
