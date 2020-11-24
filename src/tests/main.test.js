const app = require('../../app');

describe('Main', () => {
  afterAll(async () => {
    await app.mainDBRepository.disconnect();
  });
});
