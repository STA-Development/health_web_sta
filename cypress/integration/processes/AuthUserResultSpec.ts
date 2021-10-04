import {checkSingleResult, doLoginTest} from "../../helpers";

describe("Check single result from result list", () => {
    it('Check Negative result', () => {
        doLoginTest(Cypress.env('phoneNumber'), Cypress.env('verificationCode'))
        cy.get(".all-results").find('.GREEN').click()
        checkSingleResult('Negative', 'green')
    })
})