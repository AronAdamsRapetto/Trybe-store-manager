const { expect } = require("chai");
const sinon = require("sinon");

const { saleModel } = require("../../../src/models");
const connection = require("../../../src/models/connection");

const { getAllSalesReturn, getSaleByIdReturn } = require('./mocks/sale.model.mock');


describe('Testes de unidade do "saleModels"', function () {

  afterEach(sinon.restore);

  describe('Testes do "insertSale', function () {
    it('Verifica se "insertSale" retorna o id das vendas cadastradas', async function () {
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

  describe('Testes do "getAllSales', function () {
    it('Verifica se "getAllSales" retorna uma lista de vendas', async function () {
      sinon.stub(connection, "execute").resolves([getAllSalesReturn]);

      const result = await saleModel.getAllSales();

      expect(result).to.be.deep.equal(getAllSalesReturn);
    });
  });

  describe('Testes do "getSaleById', function () {
    it('Verifica se "getSaleById" retorna um produto', async function () {
      sinon.stub(connection, "execute").resolves([getSaleByIdReturn]);

      const result = await saleModel.getSaleById(1);

      expect(result).to.be.deep.equal(getSaleByIdReturn);
    });
  });

  describe('Testes do "updateSale', function () {
    it('Verifica se "updateSale" retorna as linhas afetadas ', async function () {
      sinon
        .stub(connection, "execute").resolves([{ affectedRows: 1 }]);

      const result = await saleModel.updateSale(1, 2, 30);

      expect(result).to.be.equal(1);
    });
  });

  describe('Testes do "removeSale', function () {
    it('Verifica se "removeSale" retorna as linhas afetadas ', async function () {
      sinon.stub(connection, "execute").resolves([{ affectedRows: 1 }]);

      const result = await saleModel.removeSale(1);

      expect(result).to.be.equal(1);
    });
  });
});