const express = require('express');
const router = express.Router();

const homecontroller = require('../controllers/homecontroller');

router.get('/', homecontroller.getHome);
router.get('/cart', homecontroller.getCart);

module.exports = router;