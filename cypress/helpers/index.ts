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
// export const completeProfile = () => {
//   cy.url()
//     .should("contain", "/complete-profile", {timeout: 10000})
//     .then(() => {
//       cy.get('input[data-cy="profile-firstName"]', {timeout: 10000}).type("test")
//       cy.get('input[data-cy="profile-lastName"]', {timeout: 10000}).type("test")
//       cy.get('input[data-cy="profile-postalCode"]', {timeout: 10000}).type("0225")
//       cy.get("button[data-cy=create-profile]", {timeout: 10000}).click({force: true})
//       cy.intercept({method: "GET", url: "**/patients"}).as("patients")
//       cy.wait("@patients")
//       cy.url().should("contain", "/home", {timeout: 10000})
//       cy.log(" Profile Created")
//     })
// }
// export const trainingCompleted = () => {
//   cy.get("button[data-cy=go-to-training-button]", {timeout: 10000}).click({force: true})
//   cy.get("button[data-cy=view-tests]", {timeout: 10000}).click({force: true})
//   cy.contains("step One").should("exist")
//   cy.get("button[data-cy=next-step]", {timeout: 10000}).click({force: true})
//   cy.contains("Step Two").should("exist")
//   cy.get("button[data-cy=next-step]", {timeout: 10000}).click({force: true})
//   cy.contains("Step Three").should("exist")
//   cy.get("button[data-cy=next-step]", {timeout: 10000}).click({force: true})
//   cy.contains("Step Four").should("exist")
//   cy.get("button[data-cy=next-step]", {timeout: 10000}).click({force: true})
//   cy.contains("Step Five").should("exist")
//   cy.get("button[data-cy=next-step]", {timeout: 10000}).click({force: true})
//   cy.contains("Step Six").should("exist")
//   cy.get("button[data-cy=next-step]", {timeout: 10000}).click({force: true})
//   cy.contains("Step Seven").should("exist")
//   cy.get("button[data-cy=next-step]", {timeout: 10000}).click({force: true})
//   cy.get("button[data-cy=training-completed]", {timeout: 10000}).click()
// }
// export const addKitKode = () => {
//   cy.fixture("kitCode").then(({kitCode}) => {
//     cy.log("entered kit code")
//     cy.log("kit code.")
//     const length = kitCode.length
//     for (let i = 0; i < length; i++) {
//       cy.get(`input[data-id=${i}]`, {timeout: 5000}).type(kitCode[i])
//     }
//   })
// }
// export const recordResult = () => {
//   cy.get("button[data-cy=activate-kit]", {timeout: 10000}).click()
//   cy.get("button[data-cy=add-selected-kit]", {timeout: 10000}).click()
//   cy.url().should("include", "/test", {timeout: 10000})
//   cy.get("button[data-cy=record-my-results]", {timeout: 10000}).click({force: true})
//   cy.url().should("include", "/record-result", {timeout: 10000})
// }
// export const sendPositiveResult = () => {
//   cy.get("div[data-cy=positive]", {timeout: 10000}).click({force: true})
//   cy.get("button[data-cy=submit-result]", {timeout: 10000}).click({force: true})
//   cy.get('input[id="dob-picker"]').clear().type(`19/06/2002`)
//   cy.get("h1[class=left-info__heading]").click({force: true})
//   cy.get("input[data-cy=postal-code]").type("5555")
//   cy.get("button[data-cy=submit-result]").click({force: true})
//   cy.get("input[data-cy=email-input]").type("test@gmail.com")
//   cy.get("button[data-cy=get-coupon]").click({force: true})
//   cy.intercept({method: "POST", url: "**/coupon"}).as("coupon")
//   cy.wait("@coupon")
//   cy.get("input[data-cy=coupon-input]")
//     .invoke("val")
//     .then((val1: string) => {
//       expect(val1.length).to.eq(8)
//     })
// }
// export const sendNegativeResult = () => {
//   cy.get("div[data-cy=negative]", {timeout: 10000}).click({force: true})
//   cy.get("button[data-cy=submit-result]", {timeout: 10000}).click({force: true})
//   cy.url().should("include", "/submit-result/thank-you", {timeout: 10000})
//   cy.get("h2[data-cy=test-result]").contains("Negative")
// }
// export const sendInvalidResult = () => {
//   cy.get("div[data-cy=invalid]", {timeout: 10000}).click({force: true})
//   cy.get("button[data-cy=submit-result]", {timeout: 10000}).click({force: true})
//   cy.url().should("include", "/submit-result/thank-you", {timeout: 10000})
//   cy.get("h2[data-cy=test-result]").contains("Invalid")
// }
