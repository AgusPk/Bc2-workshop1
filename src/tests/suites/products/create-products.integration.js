const request = require("supertest");
const app = require("../../../../app");

module.exports = () =>
  describe("POST create Product", () => {
    it("it should return a 201 with all the parameters", (done) => {
      const body = {
        categoria: "bebidas",
        cantidad: 5,
        nombre: "fernet",
        descripcion: "la mejor bebida",
      };
      request(app)
        .post(`/product`)
        .send(body)
        .then((response) => {
          expect(response.statusCode).toBe(201);
          done();
        });
    });

    xit("it should return a 200 with all the parameters", (done) => {
      const randomNumer = Math.floor(Math.random() * Math.floor(1000));
      const body = {
        password: "4832",
        userName: "useer",
        firstName: "pepe",
        lastName: "mujica",
        email: `ariibabo${randomNumer}@peñarol.com`,
      };
      request(app)
        .post(`/${version}/users`)
        .send(body)
        .then((response) => {
          expect(response.statusCode).toBe(200);
          done();
        });
    });
  });
