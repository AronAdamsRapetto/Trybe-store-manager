const { expect } = require('chai');
const sinon = require('sinon');

const { productService } = require('../../../src/services');
const { productModel } = require('../../../src/models');

const { resolvedGetProducts, resolvedGetProductById } = require('./mocks/product.service.mock');

describe('Testes de unidade do "productService"', function () {

  afterEach(sinon.restore);

  describe('Testes do "getAllProducts', function () {
    it('Verifica se "getAllProducts" retorna uma lista de produtos', async function () {
      sinon.stub(productModel, "getAllProducts").resolves(resolvedGetProducts);

      const result = await productService.getAllProducts();

      expect(result).to.be.deep.equal(resolvedGetProducts);
    });
  });

  describe('Testes do "getProductById', function () {
    it('Verifica se "getProductById" retorna um produto', async function () {
      sinon.stub(productModel, "getProductById").resolves(resolvedGetProductById);

      const result = await productService.getProductById(1);

      expect(result).to.be.deep.equal({ type: null, message: resolvedGetProductById });
    });

    it('Verifica se "getProductById" retorna um erro ao passar um id inexistente', async function () {
      sinon.stub(productModel, "getProductById").resolves(undefined);

      const result = await productService.getProductById(999);

      expect(result).to.be.deep.equal({
        type: "NOT_FOUND",
        message: "Product not found",
      });
    });
  });
});