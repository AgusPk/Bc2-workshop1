//Products 
const createProducts = require('./suites/products/create-products.integration');

const app = require('../../app');

describe('Main', () => {
  afterAll(async () => {
    await app.mainDBRepository.disconnect();
  });

  // Products

  createProducts()
});
