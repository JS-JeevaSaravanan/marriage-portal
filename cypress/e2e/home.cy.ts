describe('Home Page', () => {
    it('should load and show welcome message', () => {
      cy.visit('http://localhost:3000') // your local Next.js dev server
      cy.visit('/') // now shorter
      cy.contains('Find Your Perfect Life Partner')
    })
  })
  