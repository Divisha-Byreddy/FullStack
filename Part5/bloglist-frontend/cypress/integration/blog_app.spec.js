describe('Blog app', function(){
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      username : 'root1',
      password : 'root123',
      name : '123'
    }
    cy.request('POST','http://localhost:3001/api/users/',user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function(){
    cy.contains('Login to the application')
    cy.contains('login')
  })


  it('succeeds with correct credentials', function(){
    cy.login({ username: 'root1', password: 'root123' })
    cy.contains('123 logged in')
  })

  it('fails with incorrect credentials', function(){
    cy.login({ username: 'root1', password: 'hello' })
    cy.get('.error')
      .should('contain', 'invalid username or password')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
    cy.get('html').should('not.contain', '123 logged in')
  })

  describe('when logged in',function(){
    beforeEach(function(){
      const user = {
        username : 'brooklyn',
        password : 'brooklyn123',
        name : 'brooklyn'
      }
      cy.request('POST','http://localhost:3001/api/users/',user)
      cy.login({ username: 'root1', password: 'root123' })
    })

    it('A blog can be created', function(){
      cy.contains('new blog').click()
      cy.createBlog({ title : 'Ikigai', author : 'Hector', url : 'ikigai.com' })
      cy.contains('Hector')
    })

    it('user can like a blog', function(){
      cy.contains('new blog').click()
      cy.createBlog({ title : 'Ikigai', author : 'Hector', url : 'ikigai.com' })
      cy.get('.blogs').contains('view').click()
      cy.get('.blog').contains('like').click()
      cy.contains('1')
    })

    it('user can delete a blog that he created', function(){
      cy.contains('new blog').click()
      cy.createBlog({ title : 'Ikigai', author : 'Hector', url : 'ikigai.com' })
      cy.get('.blogs').contains('view').click()
      cy.contains('remove').click()
      cy.get('html').should('not.contain','Hector')
    })

    it('user can not delete a blog that he did not craete', function(){
      cy.contains('new blog').click()
      cy.createBlog({ title : 'Ikigai', author : 'Hector', url : 'ikigai.com' })
      cy.contains('logout').click()
      cy.login({ username: 'brooklyn', password: 'brooklyn123' })
      cy.get('.blogs').contains('view').click()
      cy.get('remove-button').should('not.exist')
    })
  })

  describe('blogs are ordered', function(){
    beforeEach(function(){
      cy.login({ username: 'root1', password: 'root123' })
    })

    it.only('based on likes', function(){
      cy.contains('new blog').click()
      cy.createBlog({ title : 'Ikigai', author : 'Hector', url : 'ikigai.com' })
      cy.get('#new_blog').contains('new blog').click()
      cy.createBlog({ title : 'The Alchemist', author : 'Paul', url : 'alchemist.com' })
      cy.contains('Ikigai Hector').contains('view').click()
      cy.contains('like').click()
      cy.get('.blogs').contains('The Alchemist ').contains('view').click()
      cy.contains('like').click().wait(1000).click()
      cy.visit('http://localhost:3000')
      cy.get('.blogs').eq(0).contains('The Alchemist')
      cy.get('.blogs').eq(1).contains('Ikigai')
    })
  })
})
