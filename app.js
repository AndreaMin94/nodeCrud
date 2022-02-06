const express = require('express');
const bodyParser = require('body-parser');

//db connection
const sequelize = require('./utils/database');

//routes
const homeroutes = require('./routes/homeroutes');
const adminroutes = require('./routes/adminroutes');

//models
const User = require('./models/User');
const Product = require('./models/Product');
const CartItem = require('./models/cart-item');
const Cart = require('./models/Cart');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next ) => {
    User.findByPk(1)
    .then(user => {
        req.user = user;
        next();
    })
    .catch(err => console.log(err));
})

app.use('/admin', adminroutes);
app.use(homeroutes);

//relationships
Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem});
Product.belongsToMany(Cart, { through: CartItem});


// sequelize.sync({force: true})
sequelize.sync()
.then(result => {
    //console.log('## result : ' , result);
    return User.findByPk(1)
}).then(user => {
    if(!user){
        return User.create({name: "Andrea", email: "andrea@test.com", })
    }
    return user;
}).then(user => {
    return user.createCart();
}).then(cart => {
    app.listen(3000);
})
.catch( err => console.error(err));

