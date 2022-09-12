const express = require('express');
const { saleController } = require('../controllers');

const router = express.Router();

router.post('/', saleController.insertSale);

router.get('/', saleController.getAllSales);

router.get('/:id', saleController.getSaleById);

router.delete('/:id', saleController.removeSale);

module.exports = router;