import {doLoginTest, doLogoutTest} from "../../helpers";

describe('Login To FH Health', () => {
    it('Verify Login Flow', () => {
        const phoneNumber = Cypress.env('phoneNumber')
        const verificationCode = Cypress.env('verificationCode')
        doLoginTest(phoneNumber, verificationCode);
        doLogoutTest();
    })
});
