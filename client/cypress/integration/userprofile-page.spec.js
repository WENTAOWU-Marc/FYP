let email = "20091626@mail.wit.ie";
let password = "123";
let newname = "Marc1";
let name = "Marc"

describe("User profile Page", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.get("nav").find("nav").find("a").click();
        cy.get("input").eq(0).type(email);
        cy.get("input").eq(1).type(password);
        cy.get("button").eq(0).click();
    });

    describe("Profile page test", () => {
        it("can be access to user profile page", () => {
            cy.get("nav").find("nav").find("a").click();
            cy.get("p").eq(0).should("have.text", "Name:");
        });

        it("can modify user profile", () => {
            cy.get("nav").find("nav").find("a").click();
            cy.get("input").eq(0).clear();
            cy.get("input").eq(0).type(newname);
            cy.get("button").eq(0).click();
            cy.wait(1500);
            cy.get("nav").find("nav").find("a").click();
            cy.wait(1500);
            cy.get("input").eq(0).type(email);
            cy.get("input").eq(1).type(password);
            cy.get("button").eq(0).click();
            cy.wait(1500);
            cy.get("nav").find("nav").should("have.text","WellCome,  Marc1Logout");
        });
    });

    after(() => {
        cy.get("nav").find("nav").find("a").click();
        cy.get("input").eq(0).clear();
        cy.get("input").eq(0).type(name);
        cy.get("button").eq(0).click();
      })
    
});