Cypress.Commands.add('login', ({ username, password }) => {
  cy.get('#username').type(username)
  cy.get('#password').type(password)
  cy.get('#login-submit').click()
})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.get('#title').type(title)
  cy.get('#author').type(author)
  cy.get('#url').type(url)
  cy.get('#create-submit').click()
})
