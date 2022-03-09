describe('Router test', () => {
  it('Index page should navigate to login', () => {
    cy.visit(Cypress.config().baseUrl)
    cy.location('pathname').should('eq', '/auth/login')
  })
})

export {}
