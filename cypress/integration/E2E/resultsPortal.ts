// import {doLoginTest, doLogoutTest} from '../../helpers'
export  {}
describe('Test Results in FH Health', () => {
  it('Verify Test Results', () => {
    cy.visit('/auth/login')
    cy.location('pathname').should('eq', '/auth/login')
    // const phoneNumber = Cypress.env('phoneNumber')
    // const verificationCode = Cypress.env('verificationCode')
    // doLoginTest(phoneNumber, verificationCode)
    // cy.get('[data-cy="history-results"]').should('exist')
    // doLogoutTest()
  })
})
