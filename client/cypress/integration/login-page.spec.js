let email = "20091626@mail.wit.ie";
let password = "123";
let wrongpassword = "111";
let newemail = "123@qq.com";

describe("Login Page", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    describe("Login test", () => {
        it("can be access to login page", () => {
            cy.get("nav").find("nav").find("a").click();
            cy.get("h1").should("have.text", "Log In");
        });

        it("can login with right email and password", () => {
            cy.get("nav").find("nav").find("a").click();
            cy.get("input").eq(0).type(email);
            cy.get("input").eq(1).type(password);
            cy.get("button").eq(0).click();
            cy.get("nav").find("nav").find("a").click();
            cy.get("p").eq(0).should("have.text", "Name:");
        });

        it("can give a message with wrong email or password", () => {
            cy.get("nav").find("nav").find("a").click();
            cy.get("input").eq(0).type(email);
            cy.get("input").eq(1).type(wrongpassword);
            cy.get("button").eq(0).click();
            cy.get("h4").should("have.text", "User does not exist, please register");
        });
    })

    describe("Check email test", () => {
        it("can check email when click sign up", () => {
            cy.get("nav").find("nav").find("a").click();
            cy.get("button").eq(1).click();
            cy.get("h1").should("have.text", "Check Email");
        });

        it("can check email when click sign up", () => {
            cy.get("nav").find("nav").find("a").click();
            cy.get("button").eq(1).click();
            cy.get("input").eq(0).type(newemail);
            cy.get("button").eq(0).click();
            cy.get("h4").should(
                "have.text", "The email has been checked successfully, please go to the email address to open the connection"
            )
        });
    });

    describe("Logout test", () => {
        it("can logout when login", () => {
            cy.get("nav").find("nav").find("a").click();
            cy.get("input").eq(0).type(email);
            cy.get("input").eq(1).type(password);
            cy.get("button").eq(0).click();
            cy.get("nav").find("nav").find("span").click();
            cy.get("nav").find("nav").find("a").click();
            cy.get("h1").should("have.text", "Log In");
        });
    });
})