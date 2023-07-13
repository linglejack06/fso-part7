Cypress.Commands.add('login', (credentials) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/login`, credentials)
    .then(({ body }) => {
      localStorage.setItem('loggedUser', JSON.stringify(body));
    })
})
Cypress.Commands.add('createBlog', (blog) => {
  cy.request({
    url: `${Cypress.env('BACKEND')}/blogs`,
    method: 'POST',
    body: blog,
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}`,
    },
  }).then(() => {
    cy.visit('');
  });
}) 