const Product = require("../models/Product");

exports.getHome = (req,res,next) => {
    Product.findAll({
        attributes: ['name', 'description', 'price']
    })
    .then(products => {
        console.log(products);
        res.render('home',{
            products
        });
    })
}