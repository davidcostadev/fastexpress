describe('Root', () => {

  it('list all endpoints available', () => {
    cy.clock(1532473578215);
    cy.server()
    cy.request('/')
      .then((response) => {
        expect(response.body).to.eql({
        api: {
          v1: {
            tasks: [
              '[get] /api/v1/tasks',
              '[post] /api/v1/tasks',
              '[get] /api/v1/tasks/:id',
              '[delete] /api/v1/tasks/:id',
              '[put] /api/v1/tasks/:id',
            ]
          }
        }
      });
    });
  });
});
