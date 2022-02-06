const express = require('express');
const router = express.Router();

const homecontroller = require('../controllers/homecontroller');

router.get('/', homecontroller.getHome);
router.get('/cart', homecontroller.getCart);
router.get('/add-to-cart/:prodId', homecontroller.addItemToCart);
router.post('/delete-product-from-cart', homecontroller.deleteItemFromCart);

module.exports = router;