var expect = require("chai").expect;
var request = require("axios");

describe("Test Addition", () => {
    let url = "http://localhost:3000/add/2/4";
    it("Return status code 200", async () => {
        const response = await request.get(url);
        expect(response.status).to.equal(200);
    });

    it("add 2 to 4 = 6", async () => {
        const response = await request.get(url);
        // console.log(response);
        expect(response.data.data).to.equal(6);
    });
});

describe("Test subtract", () => {
    let url = "http://localhost:3000/subtract/?n1=10&n2=2";
    it("Return status code 200", async () => {
        const response = await request.get(url);
        expect(response.status).to.equal(200);
    });

    it("subtract 2 from 10 = 8", async () => {
        const response = await request.get(url);
        // console.log(response);
        expect(response.data.data).to.equal(8);
    });
});

describe("Test divide", () => {
    let url = "http://localhost:3000/divide/?n1=6&n2=2";
    it("Return status code 200", async () => {
        const response = await request.get(url);
        expect(response.status).to.equal(200);
    });

    it("6 divide by 2 = 3", async () => {
        const response = await request.get(url);
        // console.log(response);
        expect(response.data.data).to.equal(3);
    });
});

describe("Test multiply", () => {
    let url = "http://localhost:3000/multiply/?n1=2&n2=4";
    it("Return status code 200", async () => {
        const response = await request.get(url);
        expect(response.status).to.equal(200);
    });

    it("2 multiplied by 4 = 8", async () => {
        const response = await request.get(url);
        // console.log(response);
        expect(response.data.data).to.equal(8);
    });
});
