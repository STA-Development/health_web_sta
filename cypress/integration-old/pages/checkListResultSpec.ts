import {doLoginTest} from '../../helpers'

describe('Check single result from list.', () => {
  it('Implement list check', () => {
    doLoginTest(Cypress.env('phoneNumber'), Cypress.env('verificationCode'))
    cy.log('Check if there is any single result')
    cy.get('.result-header').should('exist')
    cy.log('Check if there is any single result')
    cy.get("[data-cy='history-results']").should('exist')
  })
})
