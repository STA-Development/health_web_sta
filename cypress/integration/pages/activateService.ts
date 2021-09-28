// import {addKitKode, completeProfile, doLoginTest, trainingCompleted} from "../../helpers"
//
// export const activateService = () => {
//   describe("Send  Positive Result", () => {
//     beforeEach(() => {
//       indexedDB.deleteDatabase("firebaseLocalStorageDb")
//       localStorage.removeItem("accessToken")
//     })
//
//     it("send result positive", () => {
//       cy.visit("/")
//       cy.get("button[data-cy=purchased-kit]", {timeout: 4000}).click()
//       cy.get("button[data-cy=activate-button]").should("be.disabled")
//       addKitKode()
//       cy.get("button[data-cy=activate-button]", {timeout: 10000}).click()
//       // cy.intercept({method: "GET", url: "**/link-to-account"}).as("link-to-account")
//
//       cy.url().should("contain", "/activate-service/success", {timeout: 30000})
//       cy.get("button[data-cy=link-to-account]", {timeout: 10000}).click()
//       cy.fixture("loginPage").then(({existentLogin, existentPassword}) => {
//         doLoginTest(existentLogin, existentPassword)
//       })
//       cy.intercept({method: "POST", url: "**/link-to-account"}).as("link-to-account")
//       cy.wait("@link-to-account")
//       cy.url().should("include", "/verification-result/success", {timeout: 10000})
//       cy.get("button.dark-button", {timeout: 10000}).click()
//       completeProfile()
//       trainingCompleted()
//       cy.get("button[data-cy=begin-test-using-kit]", {timeout: 10000}).click()
//       cy.get("h4[data-cy=kit-code]").should("have.text", "Test Kit: QY6YXP")
//     })
//   })
// }
// activateService()
