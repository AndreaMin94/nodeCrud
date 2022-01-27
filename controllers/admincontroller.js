const Product = require("../models/Product");

exports.getProductForm = (req, res, next) => {
    res.render('admin/productform');
}

exports.storeProduct = (req, res, next) => {
    console.log('## req : ' , req.body);
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    Product.create({
        name, price, description
    }).then(result => {
        res.redirect('/');
    }).catch(err => console.log(err));
}