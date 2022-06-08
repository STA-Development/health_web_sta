
describe('Verify sms verification', () => {
  it('Verify sms resend', () => {
    cy.visit(`/auth/login`)
    const phoneNumber = Cypress.env('phoneNumber')
    cy.get('[data-cy="numberText"]').next().find('input').type(phoneNumber)
    cy.get('[data-cy="next"]').click()
    cy.get('[data-cy="smsVerificationHeader"]').contains('SMS Verification')
    cy.get('[data-cy="resendButton"]').should('be.visible')
  })
})
