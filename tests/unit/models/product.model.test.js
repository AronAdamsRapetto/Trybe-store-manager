const { expect } = require("chai");
const sinon = require("sinon");

const { productModel } = require("../../../src/models");
const connection = require('../../../src/models/connection');

const { resolvedGetProducts, resolvedGetProductById } = require('./mocks/product.model.mock');

describe('Testes de unidade do "productModels"', function () {

  afterEach(sinon.restore);

  describe('Testes do "getAllProducts', function () {
    it('Verifica se "getAllProducts" retorna uma lista de produtos', async function () {
      sinon.stub(connection, "execute").resolves([resolvedGetProducts]);

      const result = await productModel.getAllProducts();

      expect(result).to.be.deep.equal(resolvedGetProducts);
    });
  });

  describe('Testes do "getProductById', function () {
    it('Verifica se "getProductById" retorna um produto', async function () {
      sinon.stub(connection, "execute").resolves([[resolvedGetProductById]]);

      const result = await productModel.getProductById(1);

      expect(result).to.be.deep.equal(resolvedGetProductById);
    });
  });

  describe('Testes do "insertProduct"', function () {
    it('Verifica se "insertProduct" retorna o id do produto inserido', async function () {
      sinon.stub(connection, "execute").resolves([{ insertId: 1 }]);

      const result = await productModel.insertProduct("ProductX");

      expect(result).to.be.equal(1);
    });
  });

  describe('Testes do "updateProduct"', function () {
    it('Verifica se "updateProduct" retorna o numero de linhas efetadas', async function () {
      sinon.stub(connection, "execute").resolves([{ affectedRows: 1 }]);

      const result = await productModel.updateProduct("ProductX");

      expect(result).to.be.equal(1);
    });
  });

  describe('Testes do "removeProduct"', function () {
    it('Verifica se "removeProduct" retorna o numero de linhas efetadas', async function () {
      sinon.stub(connection, "execute").resolves([{ affectedRows: 1 }]);

      const result = await productModel.removeProduct("ProductX");

      expect(result).to.be.equal(1);
    });
  });
});
