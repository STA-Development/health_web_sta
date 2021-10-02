/// <reference types="cypress" />
export const doLoginTest = (phoneNumber: string, verificationCode: string, isNonExistUser?: boolean) => {
  cy.log("entered phone number.")
  cy.get('input[data-cy="phoneNumber"]', {timeout: 10000}).type(phoneNumber)
  cy.log("clicked on Send Verification Code.")
  cy.get('button[data-cy="next"]').click()
  cy.get('div.inputGroup_verify').should('exist')
  cy.log("entered password.")
  for (let i = 0; i < verificationCode.length; i++) {
    cy.get(`input[data-id=${i}]`, {timeout: 5000}).type(verificationCode[i])
  }
  cy.log("clicked on Verify Code")
  cy.get('button[data-cy="verify"]').click()
}
export const checkSingleResult = (testStatus:string, testStyle:string) => {
  cy.get("[data-cy='test-status']").should('contain.text', testStatus)
  cy.get("[data-cy='result-icon']").invoke('attr', 'class').should('contain', testStyle)
}