const { expect } = require('chai');
const sinon = require('sinon');

const { productController } = require('../../../src/controllers');
const { productService } = require('../../../src/services');

const {
  resolvedGetProducts,
  resolvedGetProductById,
} = require('./mocks/product.controller.mock');

describe('Testes de unidade do productController', function () {
  
  afterEach(sinon.restore);

  describe('testes de "getAllProducts', function () {
    it('verifica se o "getAllProducts" retorna uma lista de produtos', async function () {
      const res = {};
      const req = {};
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
  
      sinon.stub(productService, 'getAllProducts').resolves(resolvedGetProducts);
  
      await productController.getAllProducts(req, res);
  
      expect(res.status).to.have.been.calledWith(200);
      expect(res.status).to.have.been.calledWith(resolvedGetProducts);
    });
  });

  describe('Testes de "getProductById"', function () {
    it('verifica se o "getProductById" retorna um produto', async function () {
      const res = {};
      const req = { params: { id: 1 }};
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
  
      sinon
        .stub(productService, "getProductById")
          .resolves({ type: null, message: resolvedGetProductById});
  
      await productController.getProductById(req, res);
  
      expect(res.status).to.have.been.calledWith(200);
      expect(res.status).to.have.been.calledWith(resolvedGetProductById);
    });

    it('verifica se o "getProductById" retorna um erro ao procurar produto inexistente', async function () {
      const res = {};
      const req = { params: { id: 999 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productService, "getProductById")
        .resolves({ type: "NOT_FOUND", message: "Product not found" });

      await productController.getProductById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.status).to.have.been.calledWith({
        message: "Product not found",
      });
    });
  });
});