// import {doLoginTest} from "../../helpers"
// import {completeProfile} from "../../helpers"
// import {trainingCompleted} from "../../helpers"
// import {addKitKode} from "../../helpers"
// import {recordResult} from "../../helpers"
// import {sendPositiveResult} from "../../helpers"
//
// export const sendResultPositive = () => {
//   describe("Send  Positive Result", () => {
//     beforeEach(() => {
//       indexedDB.deleteDatabase("firebaseLocalStorageDb")
//       localStorage.removeItem("accessToken")
//     })
//
//     it("send result positive", () => {
//       cy.log("go to the login page.")
//       cy.visit("/login")
//       cy.fixture("loginPage").then(({existentLogin, existentPassword, token}) => {
//         doLoginTest(existentLogin, existentPassword)
//         cy.url().should("include", "/verification-result/success", {timeout: 10000})
//         cy.get("button.dark-button", {timeout: 10000}).click()
//         completeProfile()
//         trainingCompleted()
//         cy.get("button[data-cy=begin-test-using-kit]", {timeout: 10000}).click()
//         cy.get("button[data-cy=open-add-new-kit-modal]", {timeout: 10000}).click()
//         addKitKode()
//         recordResult()
//         sendPositiveResult()
//       })
//     })
//   })
// }
//
// sendResultPositive()
