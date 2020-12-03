const request = require("supertest");
const app = require("../../../../app");

module.exports = () =>
  describe("POST create Product", () => {
    let token;
    beforeAll(async () => {
      const body = {
        userName: "Muñeco",
        firstName: "Marcelo",
        lastName: "Gallardo",
        email: "river@plate.com",
        password: "madrid9/12",
        role: "admin",
      };
      await request(app).post("/users").send(body);
      let res = await request(app).post("/auth/login").send(body);
      token = res.body.token;
    });

    it("it should return a 201 with all the parameters", async (done) => {
      const body = {
        categoria: "bebidas",
        cantidad: 5,
        nombre: "fernet",
        descripcion: "la mejor bebida",
      };
      console.log('el token en el test', token)
      let response = await request(app)
        .post(`/product`)
        .set("Authorization", `Bearer ${token}`)
        .send(body);
      expect(response.statusCode).toBe(201);
      done();
    });

    xit("it should return a 400 if the name is missing", (done) => {
      const body = {
        categoria: "bebidas",
        cantidad: 5,
        descripcion: "la mejor bebida",
      };
      request(app)
        .post(`/product`)
        .send(body)
        .then((response) => {
          expect(response.statusCode).toBe(400);
          done();
        });
    });
  });
