describe('Tasks', () => {
  let task;

  beforeEach(() => {
    cy.server();
  });

  it('list', () => {
    cy.request('/api/v1/tasks')
      .then((response) => {
        expect(response.body.data[0].name).to.eq('Second Task');
        expect(response.body.data[0].completed).to.eq(false);
        expect(response.body.data[1].name).to.eq('First Task');
        expect(response.body.data[1].completed).to.eq(true);
        expect(response.body.pagination).to.eql({
          currentPage: 1,
          nextPage: null,
          perPage: 100,
          previousPage: null,
          totalItems: 2,
          totalPages: 1,
        })
      });
  });

  it('create', () => {
    const body = {
      name: 'Third task',
      completed: false,
    };

    cy.request('POST', '/api/v1/tasks', body)
      .then((response) => {
        expect(response.body).to.have.property('id');
        expect(response.body).to.have.property('name');
        expect(response.body).to.have.property('completed');
        expect(response.body).to.have.property('createdAt');
        expect(response.body).to.have.property('updatedAt');
        expect(response.body.name).to.eq(body.name)
        expect(response.body.completed).to.eq(body.completed)
        task = response.body;
      });
  })

  it('get', () => {
    cy.request(`/api/v1/tasks/${task.id}`)
      .then((response) => {
        expect(response.body).to.have.property('id');
        expect(response.body).to.have.property('name');
        expect(response.body).to.have.property('completed');
        expect(response.body).to.have.property('createdAt');
        expect(response.body).to.have.property('updatedAt');
        expect(response.body.id).to.eq(task.id);
        expect(response.body.name).to.eq(task.name);
        expect(response.body.completed).to.eq(task.completed);
        // expect(response.body.createdAt).to.eq(task.createdAt); to fix after
        // expect(response.body.updatedAt).to.eq(task.updatedAt); to fix after
      });
  });

  it('put', () => {
    const body = {
      name: 'Edited task',
      completed: true,
    }
    cy.request('PUT', `/api/v1/tasks/${task.id}`, body)
      .then((response) => {
        expect(response.body).to.have.property('id');
        expect(response.body).to.have.property('name');
        expect(response.body).to.have.property('completed');
        expect(response.body).to.have.property('createdAt');
        expect(response.body).to.have.property('updatedAt');
        expect(response.body.id).to.eq(task.id);
        expect(response.body.name).to.eq(body.name);
        expect(response.body.completed).to.eq(body.completed);
        // expect(response.body.createdAt).to.eq(task.createdAt); to fix after
        // expect(response.body.updatedAt).to.eq(task.updatedAt); to fix after
      });
  });

  it('destroy', () => {
    cy.request('DELETE', `/api/v1/tasks/${task.id}`)
      .then((responseDelete) => {
        expect(responseDelete.status).to.eq(204)

        cy.request({
          url: `/api/v1/tasks/${task.id}`,
          failOnStatusCode: false,
        })

          .then((responseGet) => {
          expect(responseGet.status).to.eq(404)
          expect(responseGet.body).to.eq('not found')
          console.log(responseGet)
        })
      });
  });
});
