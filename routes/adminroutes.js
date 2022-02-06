const express = require('express');
const router = express.Router();

const adminController = require('./../controllers/admincontroller');

router.get('/create-product', adminController.getProductForm);
router.post('/update-product', adminController.editProduct);

router.post('/store-product', adminController.storeProduct);
router.get('/edit-product/:prodId', adminController.getEditForm);
router.get('/delete-product/:prodId', adminController.deleteProduct);
router.get('/user-products', adminController.getUserProducts);

module.exports = router;