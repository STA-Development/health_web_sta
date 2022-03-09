// TODO: blocker from backend need more data for single test result

describe('Check single result from list.', () => {
  it('Implement list check', () => {
    const singleTestResultId = Cypress.env('singleTestResultId')
    cy.log('Go to the login page.')
    cy.visit(`/?testResultId=${singleTestResultId}`)
    //         checkSingleResult('Negative', 'green')
  })
})

export {}
