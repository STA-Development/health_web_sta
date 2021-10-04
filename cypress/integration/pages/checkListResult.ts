import { doLoginTest } from "../../helpers";
// TODO: fix google captcha blocker

describe('Check single result from list.', () => {
    it('Implement list check', () => {
        cy.log('Go to the login page.')
        cy.visit('http://localhost:3000/auth/login')
        doLoginTest(Cypress.env('phoneNumber'), Cypress.env('verificationCode'))
    })
});
