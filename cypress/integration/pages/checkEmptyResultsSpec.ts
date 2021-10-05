import {doLoginTest} from "../../helpers";

describe("Check for right component when results are empty", function () {
    it('Check empty results list', function () {
        doLoginTest(Cypress.env("noTestsPhoneNumber"), Cypress.env("noTestsVerificationCode"))
        cy.get("[data-cy='no-tests']").should("be.visible")
    });
});