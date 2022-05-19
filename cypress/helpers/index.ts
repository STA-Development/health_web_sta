/// <reference types="cypress" />
export const doLoginTest = (phoneNumber: string, verificationCode: string) => {
  const apiUrl =
    'https://reservation-dot-opn-platform-dev.nn.r.appspot.com/reservation/api/v1/test-results*'
  const patientInfoRequestUrl =
    'https://user-service-dot-opn-platform-dev.nn.r.appspot.com/user/api/v1/patients*'
  cy.intercept(apiUrl).as('testResults')
  cy.intercept(patientInfoRequestUrl).as('patientInfoResults')
  cy.visit('/#/login')
  cy.location('pathname').should('eq', '/auth/login')
  cy.get('button[data-cy="next"]').should('be.disabled')
  cy.get('input[class="form-control "]').type(phoneNumber)
  cy.get('button[data-cy="next"]').should('be.enabled').click()
  cy.log('entered phone number.')
  cy.get('button[data-cy="verify"]').should('be.disabled')
  for (let i = 0; i < verificationCode.length; i += 1) {
    cy.get(`input[data-id=${i}]`).type(verificationCode[i])
  }
  cy.log('entered verification code')
  cy.get('button[data-cy="verify"]').should('be.enabled').click()
  cy.wait('@patientInfoResults')
  cy.location('pathname').should('eq', '/results/list')
  cy.get('div[class="main-header__logo"').should('exist')
  cy.wait('@testResults')
}

export const doLogoutTest = () => {
  cy.get('div[class="rectangle-13"]').click()
  cy.get('div[class="logOut"]').click()
}
export const checkSingleResult = (testStatus: string, testStyle: string) => {
  cy.get("[data-cy='test-status']").should('contain.text', testStatus)
  cy.get("[data-cy='result-icon']").invoke('attr', 'class').should('contain', testStyle)
}
