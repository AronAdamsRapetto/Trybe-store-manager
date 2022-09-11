const { expect } = require("chai");
const sinon = require("sinon");

const { saleModel } = require("../../../src/models");
const connection = require("../../../src/models/connection");


describe('Testes de unidade do "saleModels"', function () {

  afterEach(sinon.restore);

  describe('Testes do "insertSale', function () {
    it('Verifica se "insertSale" o id das vendas cadastradas', async function () {
      sinon.stub(connection, "execute")
        .onFirstCall().resolves([{ insertId: 1 }]);

      const result = await saleModel.insertSale([
        {
          productId: 1,
          quantity: 0,
        },
        {
          productId: 2,
          quantity: 5,
        },
      ]);

      expect(result).to.be.equal(1);
    });
  });
});