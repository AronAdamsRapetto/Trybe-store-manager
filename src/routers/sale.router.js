const express = require('express');
const { saleController } = require('../controllers');

const router = express.Router();

router.post('/', saleController.insertSale);

router.get('/', saleController.getAllSales);

router.get('/:id', saleController.getSaleById);

module.exports = router;