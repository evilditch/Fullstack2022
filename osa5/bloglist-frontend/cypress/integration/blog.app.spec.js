describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Ronja Pahaoja',
      username: 'Pahis',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Login to bloglist')
  })

  describe('Login', function() {
    it('succeeds with correct username and password', function() {
      cy.get('#username').type('Pahis')
      cy.get('#password').type('salainen')
      cy.get('#loginbutton').click()

      cy.contains('Pahis logged in')
    })

    it('Fails with wrong username or password', function() {
      cy.get('#username').type('Pahis')
      cy.get('#password').type('wrong password')
      cy.get('#loginbutton').click()

      cy.contains('Username or password incorrect')
    })    
  })
})
