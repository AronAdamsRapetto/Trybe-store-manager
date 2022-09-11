const { expect } = require('chai');
const sinon = require('sinon');

const { saleController } = require("../../../src/controllers");
const { saleService } = require("../../../src/services");

const {
  sucessSaleInsert,
  getAllSalesReturn,
  getSaleByIdReturn,
} = require("./mocks/sale.controller.mock");

describe('Testes de unidade do saleController', function () {

  afterEach(sinon.restore);

  describe('Testes de unidade do "insertSale"', function () {
    it('Verifica se retorna corretamente o cadastro de venda com sucesso', async function () {
      const res = {};
      const req = {
        body: [
          {
            productId: 1,
            quantity: 2,
          },
          {
            productId: 2,
            quantity: 5,
          },
        ],
      };
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
  
      sinon.stub(saleService, 'insertSale').resolves({ type: null, message: sucessSaleInsert });
  
      await saleController.insertSale(req, res);
  
      expect(res.status.calledWith(201)).to.be.equal(true);
      expect(res.json.calledWith(sucessSaleInsert)).to.be.equal(true);
    });

    it('Verifica se retorna um erro ao tentar cadastrar sem o "productId"', async function () {
      const res = {};
      const req = {
        body: [
          {            
            quantity: 2,
          },
          {
            productId: 2,
            quantity: 5,
          },
        ],
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(saleService, "insertSale")
        .resolves({
          type: "INVALID_FIELD",
          message: '"productId" is required',
        });

      await saleController.insertSale(req, res);

      expect(res.status.calledWith(400)).to.be.equal(true);
      expect(
        res.json.calledWith({ message: '"productId" is required' })
      ).to.be.equal(true);
    });

    it('Verifica se retorna um erro ao tentar cadastrar com "quantity" inválido' , async function () {
      const res = {};
      const req = {
        body: [
          {
            productId: 1,
            quantity: 0,
          },
          {
            productId: 2,
            quantity: 5,
          },
        ],
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(saleService, "insertSale").resolves({
        type: "INVALID_VALUE",
        message: '"quantity" must be greater than or equal to 1',
      });

      await saleController.insertSale(req, res);

      expect(res.status.calledWith(422)).to.be.equal(true);
      expect(
        res.json.calledWith({
          message: '"quantity" must be greater than or equal to 1',
        })
      ).to.be.equal(true);
    });
  });
  
  describe('testes do "getAllSales', function () {
    it('verifica se o "getAllSales" retorna a lista de vendas', async function () {
      const res = {};
      const req = {};
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
  
      sinon.stub(saleService, 'getAllSales').resolves(getAllSalesReturn);
  
      await saleController.getAllSales(req, res);
  
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(getAllSalesReturn)).to.be.equal(true);
    });
  });

  describe('Testes "getSaleById"', function () {
    it('verifica se o "getSaleById" retorna uma venda', async function () {
      const res = {};
      const req = { params: { id: 1 }};
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
  
      sinon
        .stub(saleService, "getSaleById")
        .resolves({ type: null, message: getSaleByIdReturn });
  
      await saleController.getSaleById(req, res);
  
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(getSaleByIdReturn)).to.be.equal(true);
    });

    it('verifica se o "getSaleById" retorna um erro ao procurar produto inexistente', async function () {
      const res = {};
      const req = { params: { id: 999 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(saleService, "getSaleById")
        .resolves({ type: "NOT_FOUND", message: "Sale not found" });

      await saleController.getSaleById(req, res);

      expect(res.status.calledWith(404)).to.be.equal(true);
      expect(
        res.json.calledWith({
          message: "Sale not found",
        })
      ).to.be.equal(true);
    });
  });
});