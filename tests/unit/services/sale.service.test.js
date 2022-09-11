const { expect } = require("chai");
const sinon = require("sinon");

const { saleService } = require("../../../src/services");
const { saleModel, productModel } = require("../../../src/models");

const { sucessSaleInsert, productSaled } = require("./mocks/sale.service.mock");

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
});