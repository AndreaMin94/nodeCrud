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

exports.addItemToCart = (req, res, next) => {
    const prodId = req.params.prodId;
    let fetchedCart;
    let newQuantity = 1;
    req.user
    .getCart()
    .then(cart => {
        fetchedCart = cart;
        return cart.getProducts({ where: {id: prodId} });
    }).then(products => {
        let product;
        if(products.length > 0){
            product = products[0];
        }
        //se trovo il prodotto nel carrello
        if(product){
            const oldQuantity = product.cartItem.quantity;
            newQuantity = oldQuantity + 1;
            return fetchedCart.addProduct(product, {
                through: { quantity: newQuantity }
            })
        }
        //se non trovo il prodotto nel carrello
        return Product.findByPk(prodId)
        .then(product => {
            return fetchedCart.addProduct(product, 
                { through: { quantity: newQuantity } 
            })
        })
        .catch(err => {console.log(err)})
    }).then(data => {
        res.redirect('/cart');
    })
    .catch(err => {console.log(err)});
}

exports.deleteItemFromCart = (req, res, next) => {
    const prodId = req.body.prodId;
    req.user
    .getCart()
    .then(cart => {
      return  cart.getProducts({where: { id: prodId }})
    }).then(products =>{
        const product = products[0];
        return product.cartItem.destroy();
    }).then(result => {
        res.redirect('/cart');
    })
    .catch(err => {console.log(err)})
}