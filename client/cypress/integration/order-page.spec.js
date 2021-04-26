let email = "20091626@mail.wit.ie";
let password = "123";

describe("Orderlist and order Page", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.get("nav").find("nav").find("a").click();
        cy.get("input").eq(0).type(email);
        cy.get("input").eq(1).type(password);
        cy.get("button").eq(0).click();
    });

    describe("Orderlist page test", () => {
        it("can be access to orderlist page", () => {
            cy.get("nav").find("a").eq(2).click();
            cy.wait(1500);
            cy.get("div").find("th").eq(0).should("have.text", "Index");
            cy.get("div").find("th").eq(1).should("have.text", "Restaurant Name");
        });
    });

    describe("Orderlist page test", () => {
        it("can be access to orderlist page", () => {
            cy.get("nav").find("a").eq(2).click();
            cy.wait(1500);
            cy.get("div").find("td").find("a").eq(0).click();
            cy.get("h1").eq(0).should("have.text", " Restaurant Info ");
        });

        it("can be access to the map", () => {
            cy.get("nav").find("a").eq(2).click();
            cy.wait(1500);
            cy.get("div").find("td").find("a").eq(0).click();
            cy.wait(1000);
            cy.get("div").find("div").find("div").find("div").find("div").eq(0);
        });
    });
});