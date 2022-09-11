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

  describe('Testes do "insertProduct', function () {
    it('Verifica se "insertProduct" retorna um produto sem erro', async function () {
      sinon.stub(productModel, "insertProduct").resolves(1);
      sinon.stub(productModel, "getProductById").resolves({
        id: 1,
        name: "ProductX",
      });

      const result = await productService.insertProduct("ProductX");

      expect(result).to.be.deep.equal({
        type: null,
        message: {
          id: 1,
          name: "ProductX",
        },
      });
    });

    it('Verifica se "insertProduct" retorna um erro ao passar um attr. inválido', async function () {
      const result = await productService.insertProduct(undefined);

      expect(result).to.be.deep.equal({
        type: "INVALID_FIELD",
        message: '"name" is required',
      });
    });

    it('Verifica se "insertProduct" retorna um erro ao passar um valor inválido', async function () {
      const result = await productService.insertProduct('a');

      expect(result).to.be.deep.equal({
        type: "INVALID_VALUE",
        message: '"name" length must be at least 5 characters long',
      });      
    });
  });
});