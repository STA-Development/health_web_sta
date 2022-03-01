import { doLoginTest } from '../../helpers'

describe('Check for right component when results are empty', () => {
  it('Check empty results list', () => {
    doLoginTest(Cypress.env('noTestsPhoneNumber'), Cypress.env('noTestsVerificationCode'))
    cy.get("[data-cy='no-tests']").should('be.visible')
  })
})
