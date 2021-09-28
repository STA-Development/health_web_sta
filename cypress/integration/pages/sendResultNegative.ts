// import {doLoginTest} from "../../helpers"
// import {completeProfile} from "../../helpers"
// import {trainingCompleted} from "../../helpers"
// import {addKitKode} from "../../helpers"
// import {recordResult} from "../../helpers"
// import {sendNegativeResult} from "../../helpers"
//
// export const sendResultNegative = () => {
//   describe("Send  Negative Result", () => {
//     beforeEach(() => {
//       indexedDB.deleteDatabase("firebaseLocalStorageDb")
//       localStorage.removeItem("accessToken")
//     })
//
//     it("send result negative", () => {
//       cy.log("go to the login page.")
//       cy.visit("/login")
//       cy.fixture("loginPage").then(({existentLogin, existentPassword}) => {
//         doLoginTest(existentLogin, existentPassword)
//         cy.url().should("include", "/verification-result/success", {timeout: 10000})
//         cy.get("button.dark-button", {timeout: 10000}).click()
//         completeProfile()
//         trainingCompleted()
//         cy.get("button[data-cy=begin-test-using-kit]", {timeout: 10000}).click()
//         cy.get("button[data-cy=open-add-new-kit-modal]", {timeout: 10000}).click()
//         addKitKode()
//         recordResult()
//         sendNegativeResult()
//       })
//     })
//   })
// }
//
// sendResultNegative()
