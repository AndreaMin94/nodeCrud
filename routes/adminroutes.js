const express = require('express');
const router = express.Router();

const adminController = require('./../controllers/admincontroller');

router.get('/create-product', adminController.getProductForm);

module.exports = router;