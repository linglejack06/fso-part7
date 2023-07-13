describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, {
      username: 'jling',
      password: 'password',
      name: 'Jack Lingle'
    });
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, {
      username: 'jaycas',
      password: 'heydude',
      name: 'Jayden Cassady'
    });
    cy.visit('');
  })
  it('Opens with login form', () => {
    cy.contains('Login');
  })
  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.contains('login').click();
      cy.get('#username').type('jling');
      cy.get('#password').type('password');
      cy.contains('Login').click();
      cy.contains('Successfully logged in as Jack Lingle');
    })
    it('fails with incorrect credentials', () => {
      cy.contains('login').click();
      cy.get('#username').type('jcas');
      cy.get('#password').type('passtype');
      cy.contains('Login').click();
      cy.contains('Invalid Username or password');
    })
  });
  describe('When logged in', () => {
    beforeEach(() => {
      cy.login({
        username: 'jling',
        password: 'password',
      })
      cy.visit('')
    })
    it('creates new blog', () => {
      cy.contains('New Blog').click();
      cy.get('#title').type('test title');
      cy.get('#author').type('Jack lingle');
      cy.get('#url').type('https://www.cnn.com');
      cy.get('.submit-btn').click();
      cy.contains('test title by Jack lingle');
    })
    describe('blog added', () => {
      beforeEach(() => {
        cy.createBlog({
          title: 'test',
          author: 'tester',
          url: 'www.test.com'
        });
        cy.visit('');
      })
      it('likes blog', () => {
        cy.contains('Expand').click();
        cy.contains('Likes 0').click();
        cy.contains('Likes 1');
      })
      it('user can delete blog', () => {
        cy.contains('Expand').click();
        cy.contains('Delete Blog').click();
        cy.get('html').should('not.contain', 'test by tester');
      })
      it('only creator can see blog delete button', () => {
        cy.login({
          username: 'jaycas',
          password: 'heydude'
        });
        cy.contains('Expand').click();
        cy.should('not.contain', 'Delete Blog');
      })
    })
    describe('multiple blogs added', () => {
      beforeEach(() => {
        cy.createBlog({
          title: 'test',
          author: 'tester',
          url: 'www.test.com'
        });
        cy.createBlog({
          title: 'test 2',
          author: 'tester 2',
          url: 'www.test2.com'
        });
      });
      it.only('sorts blogs with most likes to top', () => {
        cy.get('.1-blog').contains('Expand').click();
        cy.get('.1-blog').contains('Likes 0').click();
        cy.get('.1-blog').should('not.contain', 'test 2 by tester 2');
      })
    })
  });
})