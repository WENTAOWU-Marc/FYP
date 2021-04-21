import chai from "chai";
import { request } from "../../app";

const expect = chai.expect;

let host = "localhost:3002";

describe("Food route", () => {
    describe("Get/food/all", () => {
        it("should return all foods and a status 200", () => {
            request(host)
                .get("/food/all")
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .expect(200)
                .end((err, res) => {
                    expect(res.body).to.be.a("array");
                });
        });
    });
});