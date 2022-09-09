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
});
