let email = "20091626@mail.wit.ie";
let password = "123";

describe("Restaurant food Page", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.get("nav").find("nav").find("a").click();
        cy.get("input").eq(0).type(email);
        cy.get("input").eq(1).type(password);
        cy.get("p").find("label").eq(1).click();
        cy.get("button").eq(0).click();
    });

    describe("Restaurant food page test", () => {
        it("can be access to restaurant food page", () => {
            cy.get("nav").find("a").eq(1).click();
            cy.wait(1500);
            cy.get("img").eq(0).click();
            cy.get("h4").eq(0).should("have.text","Name");
        });
        
        it("can get food information", () => {
            cy.get("nav").find("a").eq(1).click();
            cy.wait(1500);
            cy.get("img").eq(0).click();
            cy.get("div").get("div.ant-card-meta-title").eq(0).should("have.text","6-inch Beef Sub");
        });

        it("can choose food", () => {
            cy.get("nav").find("a").eq(1).click();
            cy.wait(1500);
            cy.get("img").eq(0).click();
            cy.get("div.ant-col.ant-col-8").find("div").find("input").eq(0).type("1");
        });

        it("can edit food", () => {
            cy.get("nav").find("a").eq(1).click();
            cy.wait(1500);
            cy.get("img").eq(0).click();
            cy.get("div.ant-col.ant-col-8").find("ul").find("span").find("span").eq(0).click();
            cy.get("div").find("button").eq(0).should("have.text","Save");
        });
    });
});
