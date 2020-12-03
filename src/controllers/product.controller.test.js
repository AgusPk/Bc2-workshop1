const productController = require("./product.controller");
const productService = require("../services/product.service.js");

jest.mock("../services/product.service.js");

let sendMock;
let statusMock;
let res;
let mock;
let req
beforeEach(() => {
  sendMock = jest.fn();
  statusMock = jest.fn();
  res = { status: statusMock, send: sendMock };
  statusMock.mockImplementation(() => res);
});

describe("product Controller", () => {
  describe("get  al products method", () => {
    test("it throws a status 200 without error", async () => {
      req = {
        query: {
          category: "",
        },
      };
      await productController.getProduct(req, res);
      expect(statusMock).toHaveBeenCalledWith(200);
    });

    test("it sends the response from the service", async () => {
      mock = ["axe", "coca cola"];

      sendMock.mockImplementation(() => mock);

      productService.getProduct.mockImplementation(() => mock);
      await productController.getProduct(req, res);
      expect(sendMock).toHaveBeenCalledWith(mock);
    });
    
  });
  describe("create product method", () => {
    test("it throws a status 201 when product created", async () => {
        req = {
          body: {
            categoria: "bebidas",
            cantidad: 5,
            nombre: "fernet",
            descripcion: "la mejor bebida",
          },
        };
        await productController.createProduct(req, res);
        expect(statusMock).toHaveBeenCalledWith(201);
      });
  });
  describe("delete single product", () => {});
  describe("get single product", () => {});
});
