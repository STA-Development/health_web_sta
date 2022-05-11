import {doLoginTest, doLogoutTest} from "../../helpers";

describe('Test Results in FH Health', () => {
    it('Verify Test Results', () => {
        const phoneNumber = Cypress.env('phoneNumber')
        const verificationCode = Cypress.env('verificationCode')
        doLoginTest(phoneNumber, verificationCode);
        cy.get(' [data-cy="history-results"]').should('exist')
        doLogoutTest();
    })
});