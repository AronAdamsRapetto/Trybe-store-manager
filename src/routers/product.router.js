const express = require('express');
const { productController } = require('../controllers');

const router = express.Router();

router.get('/', productController.getAllProducts);

router.get('/:id', productController.getProductById);

router.post('/', productController.insertProduct);

router.put('/:id', productController.updateProduct);

// router.delete('/:id', productController.removeProduct);

module.exports = router;