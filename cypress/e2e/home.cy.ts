describe('Home Page', () => {
    it('should load and show welcome message', () => {
      cy.visit('http://localhost:3000') // your local Next.js dev server
      cy.visit('/') // now shorter
      cy.contains('Find Your Perfect Life Partner')
    })


    it('navigates to the register page', () => {
      cy.visit('/')
      cy.get('a[href="/register"]').first().click()
      // cy.get('a[href="/register"]').click()
      cy.url().should('include', '/register')
      cy.contains('Registration')
    })

    it('submits a registration form', () => {
      cy.visit('/register')

      // ToDo: add data-testid to the form fields and remove in production code while building
      // cy.get('input[name="name"]').type('John Doe')
      // cy.get('input[name="email"]').type('john@example.com')
      // cy.get('textarea[name="message"]').type('Hello!')
      // cy.get('button[type="submit"]').click()
      // cy.contains('Thank you for your message')
    })
    
  })
  