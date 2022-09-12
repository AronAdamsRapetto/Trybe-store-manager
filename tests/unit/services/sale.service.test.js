const { expect } = require("chai");
const sinon = require("sinon");

const { saleService } = require("../../../src/services");
const { saleModel, productModel } = require("../../../src/models");

const {
  sucessSaleInsert,
  productSaled,
  getAllSalesReturn,
  getSaleByIdReturn,
  updateSaleReturn,
} = require("./mocks/sale.service.mock");

describe('Testes de unidade do "saleService"', function () {

  afterEach(sinon.restore);

  describe('Testes do "insertSale', function () {
    it('Verifica o retorno de "insertSale" em caso se sucesso', async function () {
      sinon.stub(productModel, "getProductById").resolves(productSaled);
      sinon.stub(saleModel, 'insertSale').resolves(1);

      const result = await saleService.insertSale([
        {
          "productId": 1,
          "quantity": 2
        }
      ]);

      expect(result).to.be.deep.equal({ type: null, message: sucessSaleInsert });
    });

    it('Verifica o retorno de "insertSale" em caso de erro no "productId"', async function () {
      const result = await saleService.insertSale([
        {
          quantity: 2,
        },
      ]);

      expect(result).to.be.deep.equal({
        type: "INVALID_FIELD",
        message: '"productId" is required',
      });
    });

    it('Verifica o retorno de "insertSale" em caso de erro no "quantity"', async function () {
      const result = await saleService.insertSale([
        {
          productId: 1,
          quantity: 0,
        },
      ]);

      expect(result).to.be.deep.equal({
        type: "INVALID_VALUE",
        message: '"quantity" must be greater than or equal to 1',
      });
    });

    it('Verifica o retorno de "insertSale" em caso de produto inexistente', async function () {
      sinon.stub(productModel, "getProductById").resolves(undefined);

      const result = await saleService.insertSale([
        {
          productId: 999,
          quantity: 2,
        },
      ]);

      expect(result).to.be.deep.equal({ type: 'NOT_FOUND', message: 'Product not found' });
    });
  });

  describe('Testes do "getAllSales', function () {
    it('Verifica se "getAllSales" retorna uma lista de vendas', async function () {
      sinon.stub(saleModel, "getAllSales").resolves(getAllSalesReturn);

      const result = await saleService.getAllSales();

      expect(result).to.be.deep.equal(getAllSalesReturn);
    });
  });

  describe('Testes do "getSaleById', function () {
    it('Verifica se "getSaleById" retorna uma venda', async function () {
      sinon
        .stub(saleModel, "getSaleById")
        .resolves(getSaleByIdReturn);

      const result = await saleService.getSaleById(1);

      expect(result).to.be.deep.equal({
        type: null,
        message: getSaleByIdReturn,
      });
    });

    it('Verifica se "getSaleById" retorna um erro ao passar um id inexistente', async function () {
      sinon.stub(saleModel, "getSaleById").resolves(undefined);

      const result = await saleService.getSaleById(999);

      expect(result).to.be.deep.equal({
        type: "NOT_FOUND",
        message: "Sale not found",
      });
    });
  });

  describe('Testes do "updateSale"', function () {
    it('Verifica o retorno de "updateSale" em caso se sucesso', async function () {
      sinon.stub(productModel, "getProductById").resolves(productSaled);
      sinon.stub(saleModel, "getSaleById").resolves(getSaleByIdReturn);
      sinon.stub(saleModel, 'updateSale').resolves(1);

      const result = await saleService.updateSale(2, [
        {
          productId: 1,
          quantity: 10,
        },
        {
          productId: 2,
          quantity: 50,
        },
      ]);

      expect(result).to.be.deep.equal({ type: null, message: updateSaleReturn });
    });

    it('Verifica o retorno de "updateSale" em caso de erro no "productId"', async function () {
      const result = await saleService.updateSale(2, [
        {
          quantity: 10,
        },
        {
          productId: 2,
          quantity: 50,
        },
      ]);

      expect(result).to.be.deep.equal({
        type: "INVALID_FIELD",
        message: '"productId" is required',
      });
    });

    it('Verifica o retorno de "updateSale" em caso de produto inexistente', async function () {
      sinon.stub(saleModel, "getSaleById").resolves(getSaleByIdReturn);
      sinon.stub(productModel, "getProductById").resolves(undefined);

      const result = await saleService.updateSale(2, [
        {
          productId: 999,
          quantity: 10,
        },
        {
          productId: 2,
          quantity: 50,
        },
      ]);

      expect(result).to.be.deep.equal({
        type: "NOT_FOUND",
        message: "Product not found",
      });
    });

    it('Verifica o retorno de "updateSale" em caso de venda inexistente', async function () {
      sinon.stub(saleModel, "getSaleById").resolves(undefined);

      const result = await saleService.updateSale(999, [
        {
          productId: 1,
          quantity: 10,
        },
        {
          productId: 2,
          quantity: 50,
        },
      ]);

      expect(result).to.be.deep.equal({
        type: "NOT_FOUND",
        message: "Sale not found",
      });
    });
  });

  describe('Testes do "removeSale', function () {
    it('Verifica se "removeSale" retorna um objeto sem message', async function () {
      sinon.stub(saleModel, "getSaleById").resolves(getSaleByIdReturn);
      sinon.stub(saleModel, 'removeSale').resolves(1);

      const result = await saleService.removeSale(1);

      expect(result).to.be.deep.equal({
        type: null,
        message: '',
      });
    });

    it('Verifica se "removeSale" retorna um erro ao passar um id inexistente', async function () {
      sinon.stub(saleModel, "getSaleById").resolves(undefined);

      const result = await saleService.removeSale(999);

      expect(result).to.be.deep.equal({
        type: "NOT_FOUND",
        message: "Sale not found",
      });
    });
  });
});