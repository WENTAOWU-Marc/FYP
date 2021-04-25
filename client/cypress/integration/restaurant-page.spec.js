let email = "20091626@mail.wit.ie";
let password = "123";

describe("Restaurant Page", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.get("nav").find("nav").find("a").click();
        cy.get("input").eq(0).type(email);
        cy.get("input").eq(1).type(password);
        cy.get("p").find("label").eq(1).click();
        cy.get("button").eq(0).click();
    });

    describe("Restaurant page test", () => {
        it("can be access to restaurant page", () => {
            cy.get("nav").find("a").eq(1).click();
            cy.get("div").get("div.ant-card-meta-title").eq(0).should("have.text","Subway");
        });
    });

    describe("Restaurant page test", () => {
        it("can be access to add restaurant page", () => {
            cy.get("nav").find("a").eq(2).click();
            cy.get("h1").should("have.text","Create a restaurant");
        });

        it("can add restaurant information", () => {
            cy.get("nav").find("a").eq(2).click();
            cy.get("input").eq(0).type("KFC");
        });
    });
});