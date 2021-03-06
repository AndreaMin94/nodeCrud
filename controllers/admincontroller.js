const Product = require("../models/Product");

exports.getProductForm = (req, res, next) => {
    res.render('admin/productform');
}

exports.storeProduct = (req, res, next) => {
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    req.user.createProduct({
        name, price, description
    }).then(result => {
        res.redirect('/');
    }).catch(err => console.log(err));
}

exports.getEditForm = (req, res, next) => {
    const prodId = req.params.prodId;
    Product.findByPk(prodId)
    .then(product => res.render('admin/editproductform', {product}))
    .catch(err => console.log(err));
}

exports.editProduct = (req, res, next) => {
    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    Product.findByPk(id)
    .then(product => {
        product.name = name;
        product.description = description;
        product.price = price;
        return product.save();
    }).then(result => {
        res.redirect('/');
    }).catch(err => console.log(err));
}

exports.deleteProduct = (req, res, next) => {
    const prodId = req.params.prodId;
    Product.destroy({
        where: {
            id: prodId
        }
    }).then(result => {
        res.redirect('/');
    }).catch(err => console.log(err));
    // Product.findByPk(prodId)
    // .then(product => {console.log(product);
    //     return product.delete();
    // }).then(result => {
    //     res.redirect('/');
    // })
    // .catch(err => console.log(err));
}
exports.getUserProducts = (req, res, next) => {
    req.user.getProducts()
    .then(products => {
        res.render('admin/products',{
            products
        });
    })
    .catch(err => console.log(err))
}