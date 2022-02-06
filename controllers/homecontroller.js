const Product = require("../models/Product");

exports.getHome = (req,res,next) => {
    Product.findAll({
        attributes: ['id','name', 'description', 'price']
    })
    .then(products => {
        console.log(products);
        res.render('home',{
            products
        });
    })
}

exports.getCart= (req,res,next) => {
    req.user.getCart()
    .then(cart => {
        return cart.getProducts()
        .then(products => {
            res.render('shop/cart',{
                products,
                cart
            })
        }) .catch(err => {console.log(err)});
    })
    .catch(err => {console.log(err)});
}