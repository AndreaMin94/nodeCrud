const express = require('express');
const router = express.Router();

const homecontroller = require('../controllers/homecontroller');

router.get('/', homecontroller.getHome);

module.exports = router;