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

  describe('testes do "getAllProducts', function () {
    it('verifica se o "getAllProducts" retorna uma lista de produtos', async function () {
      const res = {};
      const req = {};
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
  
      sinon.stub(productService, 'getAllProducts').resolves(resolvedGetProducts);
  
      await productController.getAllProducts(req, res);
  
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(resolvedGetProducts)).to.be.equal(true);
    });
  });

  describe('Testes "getProductById"', function () {
    it('verifica se o "getProductById" retorna um produto', async function () {
      const res = {};
      const req = { params: { id: 1 }};
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
  
      sinon
        .stub(productService, "getProductById")
          .resolves({ type: null, message: resolvedGetProductById});
  
      await productController.getProductById(req, res);
  
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(
        res.json.calledWith(resolvedGetProductById)
      ).to.be.equal(true);
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

      expect(res.status.calledWith(404)).to.be.equal(true);
      expect(
        res.json.calledWith({
          message: "Product not found",
        })
      ).to.be.equal(true);
    });
  });

  describe('Testes do "insertProduct"', function () {
    it('Verifica se o "insertProduct" retorna o produto cadastrado com sucesso', async function () {
      const res = {};
      const req = { body: { name: "ProductX" } };

      const expected = {
        id: 1,
        name: "ProductX",
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'insertProduct').resolves({ type: null, message: expected });

      await productController.insertProduct(req, res);

      expect(res.status.calledWith(201)).to.be.equal(true);
      expect(res.json.calledWith(expected)).to.be.equal(true);
    });

    it('Verifica se o "insertProduct" retorna um erro ao passar a chave "name" errado', async function () {
      const res = {};
      const req = { body: { nam: "ProductX" } };     

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productService, "insertProduct")
        .resolves({ type: "INVALID_FIELD", message: '"name" is required' });

      await productController.insertProduct(req, res);

      expect(res.status.calledWith(400)).to.be.equal(true);
      expect(
        res.json.calledWith({ message: '"name" is required' })
      ).to.be.equal(true);
    });

    it('Verifica se o "insertProduct" retorna um erro ao passar um valor para "name" inválido', async function () {
      const res = {};
      const req = { body: { name: "a" } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, "insertProduct").resolves({
        type: "INVALID_VALUE",
        message: '"name" length must be at least 5 characters long',
      });

      await productController.insertProduct(req, res);

      expect(res.status.calledWith(422)).to.be.equal(true);
      expect(
        res.json.calledWith({
          message: '"name" length must be at least 5 characters long',
        })
      ).to.be.equal(true);
    });
  });

  describe('Testes do "updateProduct"', function () {
    it('Verifica se o "updateProduct" retorna o produto atualizado com sucesso', async function () {
      const res = {};
      const req = { params: { id: 1 }, body: { name: "Martelo do Batman" } };

      const expected = {
        id: 1,
        name: "Martelo do Batman",
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'updateProduct').resolves({ type: null, message: expected });

      await productController.updateProduct(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(expected)).to.be.equal(true);
    });

    it('Verifica se o "updateProduct" retorna um erro tentar alterar um produto inexistente', async function () {
      const res = {};
      const req = { params: { id: 999 }, body: { name: "Martelo do Batman" } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productService, "updateProduct")
        .resolves({ type: "NOT_FOUND", message: "Product not found" });

      await productController.updateProduct(req, res);

      expect(res.status.calledWith(404)).to.be.equal(true);
      expect(res.json.calledWith({ message: "Product not found" })).to.be.equal(true);
    });

    it('Verifica se o "updateProduct" retorna um erro ao passar um "name" inválido', async function () {
      const res = {};
      const req = { params: { id: 1 }, body: { n: "Martelo do Batman" } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productService, "updateProduct")
        .resolves({ type: "INVALID_FIELD", message: '"name" is required' });

      await productController.updateProduct(req, res);

      expect(res.status.calledWith(400)).to.be.equal(true);
      expect(
        res.json.calledWith({ message: '"name" is required' })
      ).to.be.equal(true);
    });
  });

  describe('Testes do "removeProduct"', function () {
    it('Verifica se o "removeProduct" retorna status 204 sem mensagem', async function () {
      const res = {};
      const req = { params: { id: 1 } };      

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'removeProduct').resolves({ type: null, message: '' });

      await productController.removeProduct(req, res);

      expect(res.status.calledWith(204)).to.be.equal(true);
      expect(res.json.calledWith()).to.be.equal(true);
    });

     it('Verifica se o "removeProduct" retorna erro ao passar id inexistente', async function () {
       const res = {};
       const req = { params: { id: 999 } };

       res.status = sinon.stub().returns(res);
       res.json = sinon.stub().returns();

       sinon
         .stub(productService, "removeProduct")
         .resolves({ type: "NOT_FOUND", message: "Product not found" });

       await productController.removeProduct(req, res);

       expect(res.status.calledWith(404)).to.be.equal(true);
       expect(
         res.json.calledWith({ message: "Product not found", })
       ).to.be.equal(true);
     });
  });
});